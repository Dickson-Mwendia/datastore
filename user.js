/*eslint no-console: "off"*/
"use strict"

const Web3 = require('web3');

class User {

    constructor(app) {
        this._app = app;
        this._web3 = null;

        // User's global DID and address
        this.chain = "ethr";
        this.did = null;
        this.address = null;
    }

    async getWeb3Provider() {
        if (this._web3) {
            return this._web3;
        }

        let web3Provider = null;
        if (window.ethereum) {
            // Modern dapp browsers...
            web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                throw Error("User denied account access");
            }
        }
        else if (window.web3) {
            // Legacy dapp browsers...
            web3Provider = window.web3.currentProvider;
        }
        else {
            // If no injected web3 instance is detected throw an exception
            throw Error("Unable to locate Ethereum");
        }

        this._web3 = window._web3 = new Web3(web3Provider);

        this.address = await window.ethereum.enable();
        this.address = this.address.toString();
        this.did = 'did:'+this.chain+':'+this.address;

        return this._web3;
    }
}

export default User;