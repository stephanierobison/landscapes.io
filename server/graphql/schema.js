// schema.js
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

import User from './types/user.js'
import Group from './types/group.js'
import Account from './types/account.js'
import Landscape from './types/landscape.js'
import Configuration from './types/configuration.js'
import Deployment from './types/deployment.js'
import Subscription from './types/subscriptions.js'
import TypeDocument from './types/documentTypes.js'
import Tag from './types/tag.js'

const Query = `
    input userInput {
        userId: String
        isAdmin: Boolean
    }

    input documentInput {
        type: String
        url: String
        name: String
    }

    input LoginInput {
        username: String
        password: String
    }

    input UserInput {
        _id: String
        username: String
        email: String
        role: String
        profile: String
        imageUri: String
        password: String
        firstName: String
        lastName: String
    }

    input AccountInput {
        _id: String
        __typename: String
        name: String
        createdAt: String
        endpoint: String
        caBundlePath: String
        rejectUnauthorizedSsl: Boolean
        signatureBlock: String
        region: String
        isOtherRegion: Boolean
        accessKeyId: String
        secretAccessKey: String
    }

    input DeploymentInput {
        _id: String
        __typename: String
        createdAt: String
        createdBy: String
        stackName: String
        accountName: String
        landscapeId: String
        isDeleted: Boolean
        description: String
        location: String
        billingCode: String
        flavor: String
        accessKeyId: String
        secretAccessKey: String
        cloudFormationTemplate: String
        cloudFormationParameters: [String]
        tags: [String]
        notes: [String]
        stackId: String
        stackStatus: String
        stackLastUpdate: String
        awsErrors: String
    }

    input LandscapeInput {
        _id: String
        __typename: String
        name: String
        version: String
        imageUri: String
        img: String
        documents: [documentInput]
        createdAt: String
        infoLink: String
        infoLinkText: String
        description: String
        cloudFormationTemplate: String
    }

    input GroupInput {
      _id: String
      landscapes: [String]
      users: [userInput]
      permissions: [String]
      accounts: [String]
      imageUri: String
      name: String
      description: String
    }

    input TagInput {
      _id: String
      key: String
      defaultValue: String
      isGlobal: Boolean
      isRequired: Boolean
    }

    input DocumentTypeInput {
      _id: String
      name: String
      description: String
    }

    type Query {
        groups: [Group]
        groupsByUser(id: String, isGlobalAdmin: Boolean): [Group]
        groupById(id: String): Group
        accounts: [Account]
        landscapes: [Landscape]
        configuration: [Configuration]
        documentTypes: [TypeDocument]
        tags: [Tag]
        landscapeById(id: String): [Landscape]
        landscapesWithDeploymentStatus: [Landscape]
        users: [User],
        userById(id: String): [User]
    }
`

const Mutation = `
    type Mutation {
        loginUser ( user: LoginInput! ): User
        createUser ( user: UserInput! ): User
        updateUser ( user: UserInput! ): User
        deleteUser ( user: UserInput! ): User
        toggleFirstUser ( configId: String! ): Configuration

        createTag ( tag: TagInput! ): Tag
        updateTag ( tag: TagInput! ): Tag
        deleteTag ( tag: TagInput! ): Tag

        createDocumentType ( documentType: DocumentTypeInput! ): TypeDocument
        updateDocumentType ( documentType: DocumentTypeInput! ): TypeDocument
        deleteDocumentType ( documentType: DocumentTypeInput! ): TypeDocument

        createGroup ( group: GroupInput! ): Group
        updateGroup ( group: GroupInput! ): Group
        deleteGroup ( group: GroupInput! ): Group
        editGroup ( group: GroupInput! ): Group

        createAccount ( account: AccountInput! ): Account
        updateAccount ( account: AccountInput! ): Account
        deleteAccount ( account: AccountInput! ): Account

        createLandscape ( landscape: LandscapeInput! ): Landscape
        updateLandscape ( landscape: LandscapeInput! ): Landscape
        deleteLandscape ( landscape: LandscapeInput! ): Landscape

        createDeployment ( deployment: DeploymentInput! ): Deployment
        updateDeployment ( deployment: DeploymentInput! ): Deployment
        deleteDeployment ( deployment: DeploymentInput! ): Deployment
        deploymentStatus ( deployment: DeploymentInput! ): Deployment
        deploymentsByLandscapeId ( landscapeId: String! ): [Deployment]
    }
`

export default makeExecutableSchema({
    typeDefs: [
        Query,
        Account,
        Configuration,
        Deployment,
        Group,
        Landscape,
        Mutation,
        Subscription,
        Tag,
        TypeDocument,
        User
    ],
    resolvers,
})
