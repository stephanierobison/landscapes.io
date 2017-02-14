import gql from 'graphql-tag'
import { Landscapes } from '../../views'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { bindActionCreators } from 'redux'
import * as viewsActions from '../../redux/modules/views'
import * as landscapesActions from '../../redux/modules/landscapes'
import * as authorizationActions from '../../redux/modules/authorization'

/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/
 const UserQuery = gql `
     query getUsers {
         users {
             _id,
             username,
             email,
             firstName,
             lastName,
             password,
             role
         }
     }
  `
  const GroupQuery = gql `
      query getGroups {
          groups {
              _id,
              name,
              users{
                isAdmin,
                userId
              },
              description,
              landscapes,
              permissions
          }
      }
   `

const LandscapeQuery = gql `
    query getLandscapes {
        landscapes {
            _id,
            name,
            version,
            imageUri,
            infoLink,
            infoLinkText,
            documents{
              type,
              name,
              url
            },
            createdAt,
            description,
            cloudFormationTemplate
        }
    }
 `
 // img,
 // createdBy

const DeploymentByLandscapeIdMutation = gql `
    mutation getDeploymentsByLandscapeId($landscapeId: String!) {
        deploymentsByLandscapeId(landscapeId: $landscapeId) {
            _id,
            createdAt,
            stackName,
            accountName,
            landscapeId,
            isDeleted,
            description,
            location,
            billingCode,
            flavor,
            cloudFormationTemplate,
            cloudFormationParameters{
              ParameterKey,
              ParameterValue
            },
            tags,
            notes,
            stackId,
            stackStatus,
            stackLastUpdate,
            awsErrors
        }
    }
`

const DeploymentStatusMutation = gql `
    mutation getDeploymentStatus($deployment: DeploymentInput!) {
        deploymentStatus(deployment: $deployment) {
            _id,
            stackStatus,
            stackName,
            location,
            createdAt,
            isDeleted,
            awsErrors
        }
    }
`

const LandscapesWithQuery = graphql(LandscapeQuery, {
    props: ({ data: { loading, landscapes } }) => ({
        loading,
        landscapes
    })
})

const UsersWithQuery = graphql(UserQuery, {
    props: ({ data: { loading, users } }) => ({
        users,
        loading
    })
})

const GroupsWithQuery = graphql(GroupQuery, {
    props: ({ data: { loading, groups, refetch } }) => ({
        groups,
        loading,
        refetchGroups: refetch
    })
})

const composedRequest = compose(
    LandscapesWithQuery,
    UsersWithQuery,
    GroupsWithQuery,
    graphql(DeploymentStatusMutation, { name: 'deploymentStatus' }),
    graphql(DeploymentByLandscapeIdMutation, { name: 'deploymentsByLandscapeId' })
)(Landscapes)


/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = state => {
    return {
        currentUser: state.userAuth,
        userAccess: state.authorization.userAccess,
        pendingDeployments: state.landscapes.pendingDeployments,
        hasPendingDeployments: state.landscapes.hasPendingDeployments
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        enterLandscapes: viewsActions.enterLandscapes,
        leaveLandscapes: viewsActions.leaveLandscapes,
        setActiveLandscape: landscapesActions.setActiveLandscape,
        setPendingDeployments: landscapesActions.setPendingDeployments,
        setUserAccess: authorizationActions.setUserAccess
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(composedRequest)
