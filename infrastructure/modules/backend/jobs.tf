module "job" {
  source      = "./job"
  name        = "fetchThemes"
  environment = "${var.environment}"
}
