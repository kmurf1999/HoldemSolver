use crate::graphql::Context;

mod account;
mod auth;

use account::AccountMutation;
use auth::AuthMutation;

pub struct Mutation;

#[juniper::graphql_object(Context = Context)]
impl Mutation {
    fn auth() -> AuthMutation {
        AuthMutation
    }
    fn account() -> AccountMutation {
        AccountMutation
    }
}


