# Icebox REST API

## Introduction

Icebox provides a service for importing, browsing, and download various OpenQuake artifacts, intended for use by web clients. The supported API methods are described below.

All responses are JSON, unless otherwise noted.

#### GET /icebox/artifacts/

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

#### GET /icebox/artifact/:artifact_id/

Get the raw content of the requested artifact. Since Icebox stores artifacts as text blobs, content types and the content itself can vary greatly.

Parameters: None

Response: The raw content of the artifact (a blob of XML, JSON, GeoJSON, plain text, etc.)

#### GET /icebox/artifact_groups/

List a summary of all artifact groups available to the current user. (TODO: This needs to take into account Django authentication with the oq-platform.)

Parameters:
    * group_type: (Optional) Filter results to match only this group type. Group type can techincally be anything, but typical group types are "map" and "calculation". See the `group_type` attribute in the example results below.

Response (example):

    [{"url": "http://localhost:8000/icebox/artifact_group/1",
      "name": "Hazard Calculation 1",
      "group_type": "calculation",
      "id": 1},
     {"url": "http://localhost:8000/icebox/artifact_group/2",
      "name": "Custom Map 1",
      "group_type": "map",
      "id": 2}]

#### GET /icebox/artifact_group/:group_id/

Get an artifact group, including a summarized list of all of the artifacts belonging to the group.

Parameters: None

Response (example):

    {"name": "Hazard Calculation 1",
     "group_type": "calculation",
     "id": 1,
     "artifacts": [
         {"url": "http://localhost:8000/icebox/artifact/164",
          "artifact_type": "hazard_map",
          "name": "hazard-map(0.2)-SA(0.1)-rlz-129",
          "content_type": "geojson",
          "id": 164},
         {"url": "http://localhost:8000/icebox/artifact/165",
          "artifact_type": "hazard_map",
          "name": "hazard-map(0.2)-SA(0.1)-rlz-130",
          "content_type": "geojson",
          "id": 165},
         {"url": "http://localhost:8000/icebox/artifact/166",
          "artifact_type": "hazard_map",
          "name": "hazard-map(0.2)-SA(0.1)-rlz-131",
          "content_type": "geojson",
          "id": 166}]}

#### POST /icebox/artifacts/import/

Initiates an import of artifacts from a location which implements the oq-engine-server API. (TODO: Link oq-engine-server API doc.)

Parameters:
  * import_url: a URL which implements the `/v1/calc/hazard/:calc_id/results` or `/v1/calc/risk/:calc_id/results` method of the oq-engine-server (TODO: add links to related doc)
  * owner: username of an oq-platform user to whom the imported artifacts will belong
