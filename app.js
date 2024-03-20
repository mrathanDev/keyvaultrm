// Import required modules
const express = require('express');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

// Create Express application
const app = express();
const port = 3000;

// Azure Key Vault details
const keyVaultName = 'keyvaultrm';
const secretName = 'database-connection-string';

// Azure Key Vault client setup
const credential = new DefaultAzureCredential();
const client = new SecretClient(`https://${keyVaultName}.vault.azure.net`, credential);

// Route to retrieve secret
app.get('/secret', async (req, res) => {
    try {
        // Retrieve secret from Azure Key Vault
        const secret = await client.getSecret(secretName);

        // Respond with the secret value
        res.send(`The secret value is: ${secret.value}`);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving secret:', error);
        res.status(500).send('Error retrieving secret from Azure Key Vault');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
