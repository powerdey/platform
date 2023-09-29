data "google_project" "default" {}

module "bigquery" {
  source  = "terraform-google-modules/bigquery/google"
  version = "~> 6.1"

  dataset_id                  = "power_records"
  dataset_name                = "power_records"
  description                 = "Data synced from firestore records"
  project_id                  = data.google_project.default.project_id
  location                    = "US"
  default_table_expiration_ms = null

  tables = [
    {
      table_id = "trends",
      schema = jsonencode([
        {
          name : "on",
          type : "BOOL",
          mode : "REQUIRED",
          description : "Power on"
        },
        {
          name : "recorded_at",
          type : "DATETIME",
          mode : "REQUIRED",
          description : "Date record was made"
        },
        {
          name : "device_id",
          type : "STRING",
          mode : "REQUIRED",
          description : "Unique device id"
        }
      ]),
      time_partitioning = {
        type                     = "DAY",
        field                    = null,
        require_partition_filter = false,
        expiration_ms            = null,
      },
      range_partitioning = null,
      expiration_time    = null,
      clustering         = [],
      labels             = {},
    }
  ]

  #  views = [
  #    {
  #      view_id    = "barview",
  #      use_legacy_sql = false,
  #      query = <<EOF
  #      SELECT
  #       column_a,
  #       column_b,
  #      FROM
  #        `project_id.dataset_id.table_id`
  #      WHERE
  #        approved_user = SESSION_USER
  #      EOF,
  #      labels = {
  #        env      = "devops"
  #        billable = "true"
  #        owner    = "joedoe"
  #      }
  #    }
  #  ]
  dataset_labels = {
    env      = "dev"
    billable = "true"
  }
}
