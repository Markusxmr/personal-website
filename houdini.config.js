const CLIENT = "./src/lib/core/graphql/client";
const SCHEMA_PATH = "./src/lib/core/graphql/schema.json";

/** @type {import('houdini').ConfigFile} */
const config = {
    client: CLIENT,
	schemaPath: SCHEMA_PATH,
    include: "./src/**/*.{svelte,gql,graphql}",
	scalars: {
		DateTime: {
			type: 'Date'
		},
		timestamptz: {
			type: 'Date'
		},
		numeric: {
			type: 'Number'
		},
		uuid: {
			type: "String"
		},
    },
    plugins: {
        "houdini-svelte": {
            client: CLIENT
        }
    },
}

export default config;