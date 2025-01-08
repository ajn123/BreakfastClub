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


output "cluster_endpoint" {
  value     = digitalocean_kubernetes_cluster.cluster.endpoint
  sensitive = true
}

output "kubeconfig" {
  value     = digitalocean_kubernetes_cluster.cluster.kube_config[0].raw_config
  sensitive = true
}