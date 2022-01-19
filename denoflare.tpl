{
    "$schema": "https://raw.githubusercontent.com/skymethod/denoflare/v0.4.1/common/config.schema.json",
    "scripts": {
        "get-images": {
            "path": "workers/get-images.ts",
            "bindings": {
                "accountId": { "value": "TODO" },
                "apiToken": { "value": "TODO" }
            },
            "localPort": 3030
        },
        "hello-local": {
            "path": "workers/hello.ts",
            "localPort": 3030
        }
    },
    "profiles": {
        "account1": {
            "accountId": "TODO",
            "apiToken": "TODO"
        }
    }
}