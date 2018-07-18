variable "environment" {}
variable "app_domain" {}
variable "logs_bucket" {}

variable "aliases" {
  type    = "list"
  default = []
}

variable "acm_certificate_arn" {
  default = ""
}
