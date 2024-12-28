terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
} 


resource "digitalocean_container_registry" "api-registry-unified" {
  name                   = "api-registry-unified"
  subscription_tier_slug = "basic"
  region                = "nyc3"
}

resource "digitalocean_container_registry_docker_credentials" "api-registry" {
  registry_name = digitalocean_container_registry.api-registry-unified.name
}


# Create Kubernetes cluster
resource "digitalocean_kubernetes_cluster" "cluster" {
  name    = "my-cluster"
  region  = "nyc3"
  version = "1.31.1-do.5"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb"
    node_count = 1
  }
}




resource "digitalocean_droplet" "api" {
  name = "api"
  image = "ubuntu-22-04-x64"
  region = "nyc3"
  size = "s-1vcpu-1gb"
}

resource "digitalocean_database_cluster" "mysql" {
  name       = "api-database"
  engine     = "mysql"
  version    = "8"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc3"
  node_count = 1
}

resource "digitalocean_database_firewall" "mysql-fw" {
  cluster_id = digitalocean_database_cluster.mysql.id

  rule {
    type  = "droplet"
    value = digitalocean_droplet.api.id
  }
}

output "cluster_endpoint" {
  value     = digitalocean_kubernetes_cluster.cluster.endpoint
  sensitive = true
}

output "kubeconfig" {
  value     = digitalocean_kubernetes_cluster.cluster.kube_config[0].raw_config
  sensitive = true
}

output "database_url" {
  value     = digitalocean_database_cluster.mysql.uri
  sensitive = true
}

output "registry_url" {
  value = digitalocean_container_registry.api-registry-unified.server_url
}