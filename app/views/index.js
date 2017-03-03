// non protected views:
import Home             from './home/Home'
import PageNotFound     from './home/Home'
import Login            from './login/Login'
import Register         from './register/Register'
import Password         from './password/Password'

// protected views:
import Protected        from './protected/Protected'

import CreateLandscape  from './landscapes/CreateLandscape'
import EditLandscape    from './landscapes/EditLandscape'
import LandscapeDetails from './landscapes/LandscapeDetails'
import Landscapes       from './landscapes/Landscapes'

import Ldap       from './ldap/Ldap'

import Users            from './users/Users'
import CreateUser       from './users/CreateUser'
import EditUser         from './users/EditUser'
import UserDetails      from './users/UserDetails'
import Profile          from './users/Profile'

import Groups           from './groups/Groups'
import CreateGroup      from './groups/CreateGroup'
import EditGroup        from './groups/EditGroup'
import GroupDetails     from './groups/GroupDetails'

import Tags         from './tags/Tags'
import CreateTag    from './tags/CreateTag'
import UpdateTag    from './tags/UpdateTag'

import Integrations         from './integrations/Integrations'
import IntegrationDetails         from './integrations/IntegrationDetails'
import IntegrationConfigure         from './integrations/IntegrationConfigure'

import Accounts         from './accounts/Accounts'
import CreateAccount    from './accounts/CreateAccount'
import UpdateAccount    from './accounts/UpdateAccount'

import Deployments      from './deployments/Deployments'
import CreateDeployment      from './deployments/CreateDeployment'

import DocumentTypes      from './documentTypes/DocumentTypes'
import CreateDocumentTypes      from './documentTypes/CreateDocumentTypes'
import UpdateDocumentTypes      from './documentTypes/UpdateDocumentTypes'

export {
    // non protected views:
    Home,
    PageNotFound,
    Login,
    Register,
    Password,
    // protected views:
    Protected,
    Landscapes,
    CreateLandscape,
    EditLandscape,
    LandscapeDetails,

    Ldap,

    Users,
    CreateUser,
    EditUser,
    UserDetails,
    Profile,

    Groups,
    CreateGroup,
    EditGroup,
    GroupDetails,

    Tags,
    CreateTag,
    UpdateTag,

    Integrations,
    IntegrationDetails,
    IntegrationConfigure,

    Accounts,
    CreateAccount,
    UpdateAccount,

    Deployments,
    CreateDeployment,

    DocumentTypes,
    CreateDocumentTypes,
    UpdateDocumentTypes
}
