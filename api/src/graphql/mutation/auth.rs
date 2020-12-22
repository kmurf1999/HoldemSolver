use crate::graphql::Context;
use crate::{auth, model};
use rand::{distributions::Alphanumeric, Rng};
use thiserror::Error;
use juniper::FieldResult;
use chrono::{Duration, Utc};
// use std::net::SocketAddr;
use uuid::Uuid;

#[derive(juniper::GraphQLInputObject, Debug)]
pub struct AuthInput {
    email: String,
    password: String,
}

#[allow(dead_code)]
#[derive(Error, Debug)]
pub enum AuthError {
    #[error("invalid credentials")]
    InvalidCredentials,
    #[error("could not hash password")]
    ArgonError,
    #[error("This email is already in use")]
    DuplicateEmail
}


pub struct AuthMutation;

#[juniper::graphql_object(Context = Context)]
impl AuthMutation {
    async fn register(ctx: &Context, input: AuthInput) -> FieldResult<model::Auth> {
        let argon = ctx.argon();

        let AuthInput { email, password } = input;
        let password = argon.hasher().with_password(password).hash()?;
        let id = Uuid::new_v4();

        crate::sql::account::create_account(ctx.database(), id, &email, &password)
            .await
            .or(Err(AuthError::DuplicateEmail))?;

        let account = crate::sql::account::get_account(ctx.database(), &email).await?;
        
        let identity = model::session::Identity {
            fingerprint: None,
            // TODO actually get remote IP
            ip: None
        };
        
        let claims = auth::Claims {
            session: rand::thread_rng()
                .sample_iter(&Alphanumeric)
                .take(64)
                .collect(),
            csrf: rand::thread_rng()
                .sample_iter(&Alphanumeric)
                .take(64)
                .collect(),
        };
        
        let csrf = claims.csrf.clone();
        // TODO make request lifetime a custom field
        let expiry = Utc::now() + Duration::seconds(ctx.session_lifetime(Some(1000000)));
    
        crate::sql::account::create_session(
            ctx.database(),
            &claims.session,
            &claims.csrf,
            account.id,
            identity,
            expiry,
        )
        .await?;
        
        let jwt = ctx.jwt().encode(claims, expiry)?;
        
        Ok(model::Auth {
            jwt,
            csrf
        })
    }
    async fn login(ctx: &Context, input: AuthInput) -> FieldResult<model::Auth> {
        let AuthInput { email, password } = input;

        let account = crate::sql::account::get_account_id_password_by_email(ctx.database(), &email)
            .await?
            .ok_or(AuthError::InvalidCredentials)?;

        let is_valid = ctx
            .argon()
            .verifier()
            .with_hash(&account.password)
            .with_password(&password)
            .verify()
            .or(Err(AuthError::ArgonError))?;

        if !is_valid {
            return Err(AuthError::InvalidCredentials.into());
        }
        
        let identity = model::session::Identity {
            fingerprint: None,
            // TODO actually get remote IP
            ip: None
        };
        
        let claims = auth::Claims {
            session: rand::thread_rng()
                .sample_iter(&Alphanumeric)
                .take(64)
                .collect(),
            csrf: rand::thread_rng()
                .sample_iter(&Alphanumeric)
                .take(64)
                .collect(),
        };
        
        let csrf = claims.csrf.clone();
        // TODO make request lifetime a custom field
        let expiry = Utc::now() + Duration::seconds(ctx.session_lifetime(Some(1000000)));
    
        crate::sql::account::create_session(
            ctx.database(),
            &claims.session,
            &claims.csrf,
            account.id,
            identity,
            expiry,
        )
        .await?;
        
        let jwt = ctx.jwt().encode(claims, expiry)?;
        
        Ok(model::Auth {
            jwt,
            csrf
        })
    }
}

