# Icebox REST API

## Introduction

Icebox provides a service for importing, browsing, and download various OpenQuake artifacts, intended for use by web clients. The supported API methods are described below.

All responses are JSON, unless otherwise noted.

#### GET /icebox/artifacts

List a summary of all artifacts available to the current user. (TODO: This needs to take into account Django authentication with the oq-platform.)

Parmeters: None

Response (example):

    [{"url": "http://www.openquake.org/icebox/artifact/20",
      "artifact_type": "loss_map",
      "name": "mean loss map type=structural poe=0.1000",
      "content_type": "geojson",
      "id": 20},
     {"url": "http://www.openquake.org/icebox/artifact/21",
      "artifact_type": "loss_map",
      "name": "quantile(0.1000) loss map type=structural poe=0.1000",
      "content_type": "geojson",
      "id": 21}]

#### GET /icebox/artifact/:artifact_id

Get the raw content of the requested artifact. Since Icebox stores artifacts as text blobs, content types and the content itself can vary greatly.

Parameters: None

Response: The raw content of the artifact (a blob of XML, JSON, GeoJSON, plain text, etc.)

#### POST /icebox/artifacts/import

Initiates an import of artifacts from a location which implements the oq-engine-server API. (TODO: Link oq-engine-server API doc.)

Parameters:
  * import_url: a URL which implements the `/v1/calc/hazard/:calc_id/results` or `/v1/calc/risk/:calc_id/results` method of the oq-engine-server (TODO: add links to related doc)
  * owner: username of an oq-platform user to whom the imported artifacts will belong
