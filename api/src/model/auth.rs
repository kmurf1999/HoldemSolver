use juniper::GraphQLObject;
use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, GraphQLObject, Debug)]
pub struct Auth {
    pub csrf: String,
    pub jwt: String
}