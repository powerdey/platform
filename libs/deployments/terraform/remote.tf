terraform {
  backend "gcs" {
    bucket = "powerdey-terraform-state"
    prefix = "terraform"
  }
}
