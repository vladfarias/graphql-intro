import { ApolloServer, gql } from "apollo-server";
import Service, { CustomError } from './service'

const service = new Service();

const typeDefs = gql `

    type Student {
        id: String!
        name: String!
    }
    type AddStudentPayload {
        message: String!
    }
    type Query {
        studentsList: [Student!]!
    }

    type Mutation { 
        addStudent(name: String!): AddStudentPayload!
    }
`
const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            studentsList: async () => {
                return await service.getStudents('db.json');
            }
        },
        Mutation:{
            addStudent: async (_, args) => { 
                try{
                   const result = await service.addStudentToDb('db.json', args)
                return result
                }catch(err){
                    const erro = err as CustomError;
                    throw erro
                }
            }
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Server running on ${url} `);
})
