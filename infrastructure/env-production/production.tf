variable "aws_access_key" {}
variable "aws_secret_key" {}

variable "region" {
  default = "us-east-1"
}

provider "aws" {
  region     = "${var.region}"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}

module "backend" {
  source      = "../modules/backend"
  environment = "production"
}

# module "frontend" {
#   source      = "../modules/frontend"
#   project     = "${var.project}"
#   environment = "production"
# }

