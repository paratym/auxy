use std::f32::consts::E;

use const_format::concatcp;
use hyper::{Client, client::HttpConnector};
use base64::{engine::general_purpose::URL_SAFE_NO_PAD as base64Engine, Engine};

const AUTH_CALLBACK_URL: &str =
    concatcp!(dotenv!("EXTERNAL_URL"), "/service/spotify/auth/callback");

pub enum AuthScope {
    UgcImageUpload,

    UserReadPlaybackState,
    UserModifyPlaybackState,
    UserReadCurrentlyPlaying,

    AppRemoteControl,
    Streaming,

    PlaylistReadPrivate,
    PlaylistReadCollaborative,
    PlaylistModifyPrivate,
    PlaylistModifyPublic,

    UserFollowModify,
    UserFollowRead,

    UserReadPlaybackPosition,
    UserTopRead,
    UserReadRecentlyPlayed,

    UserLibraryModify,
    UserLibraryRead,

    UserReadEmail,
    UserReadPrivate,

    UserSoaLink,
    UserSoaUnlink,
    UserManageEntitlements,
    UserManagePartner,
    UserCreatePartner,
}

impl AsRef<str> for AuthScope {
    fn as_ref(&self) -> &str {
        match self {
            Self::UgcImageUpload => "ugc-image-upload",
            Self::UserReadPlaybackState => "user-read-playback-state",
            Self::UserModifyPlaybackState => "user-modify-playback-state",
            Self::UserReadCurrentlyPlaying => "user-read-currently-playing",
            Self::AppRemoteControl => "app-remote-control",
            Self::Streaming => "streaming",
            Self::PlaylistReadPrivate => "playlist-read-private",
            Self::PlaylistReadCollaborative => "playlist-read-collaborative",
            Self::PlaylistModifyPrivate => "playlist-modify-private",
            Self::PlaylistModifyPublic => "playlist-modify-public",
            Self::UserFollowModify => "user-follow-modify",
            Self::UserFollowRead => "user-follow-read",
            Self::UserReadPlaybackPosition => "user-read-playback-position",
            Self::UserTopRead => "user-top-read",
            Self::UserReadRecentlyPlayed => "user-read-recently-played",
            Self::UserLibraryModify => "user-library-modify",
            Self::UserLibraryRead => "user-library-read",
            Self::UserReadEmail => "user-read-email",
            Self::UserReadPrivate => "user-read-private",
            Self::UserSoaLink => "user-soa-link",
            Self::UserSoaUnlink => "user-soa-unlink",
            Self::UserManageEntitlements => "user-manage-entitlements",
            Self::UserManagePartner => "user-manage-partner",
            Self::UserCreatePartner => "user-create-partner",
        }
    }
}

pub struct SpotifyClient {
    client: Client<HttpConnector>
}

impl SpotifyClient {
    pub fn auth_url(scopes: impl IntoIterator<Item = AuthScope>, state: &str) -> String {
        let scopes_str = scopes
            .into_iter()
            .fold(String::new(), |scopes, scope| scopes + " " + scope.as_ref());

        format!(
            "https://accounts.spotify.com/authorize?response_type=code&client_id={}&redirect_uri={}&scope={}&state={}",
            dotenv!("SPOTIFY_CLIENT_ID"),
            AUTH_CALLBACK_URL,
            scopes_str,
            state
        )
    }

    pub async fn get_access_token(refresh_token: &str) -> Result<String, ()> {
        Err(())
    }
}
