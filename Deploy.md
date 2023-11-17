# Deploying application

## Setting up Azure Kubernetes Service (AKS)

1. Login to Azure.
```sh
az login
```

2. Create a resource group
```sh
resource_group=< resource group name > 
location=< location e.g. northeurope >
az group create --name $resource_group --location $location
```

3. Create a kubernetes cluster service
```sh
cluster_name=< cluster name >
az aks create \
    --resource-group $resource_group \
    --name $cluster_name \
    --node-vm-size standard_b2ms \
    --node-count 1 \
    --generate-ssh-keys \
    --enable-node-public-ip
```

4. Connect kubectl to the created cluster.
```sh
az aks get-credentials --resource-group $resource_group --name $cluster_name
```

## Set up application

Install application helm chart
```sh
helm install synonyms chars --namespace synonyms --create-namespace
```

## Use application

Get IP address
```sh
echo $(kubectl get service -n synonyms  webserver -o=jsonpath='{.status.loadBalancer.ingress[].ip}') 
```

Get user name
```sh
echo $(kubectl get deployment -n synonyms  webserver -o=jsonpath='{.spec.template.spec.containers[].env[?(@.name=="SERVER_USER")].value}')
```

Get password
```sh
echo $(kubectl get secret -n synonyms webserver -o=jsonpath='{.data.server_password}' |base64 -d)
```

## Tear down applicatin

Delete helm chart and helm namespace
```sh
helm delete synonyms  --namespace synonyms
```

## Tear down AKS

Delete resource group
```sh
az group delete -y --name $resource_group
```
