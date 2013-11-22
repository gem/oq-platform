# Icebox REST API

## Introduction

Icebox provides a service for importing, browsing, and download various OpenQuake artifacts, intended for use by web clients. The supported API methods are described below.

All responses are JSON, unless otherwise noted.

#### GET /icebox/calculations/

List a summary of all calculations available to the current user.

Parmeters: None

Response (example):

    [{"url": "http://www.openquake.org/icebox/calculations/20",
      "name": "Hazard Calculation Foo",
      "id": 20},
     {"url": "http://www.openquake.org/icebox/calculations/21",
      "name": "Risk Calculation Bar",
      "id": 21}]

#### GET /icebox/calculations/:calculation_id/

Get the requested calculation.

Parameters: None

Response: The list of outputs associated with the requested calculation

#### POST /icebox/calculations/

Create a calculation.

Response: OK.


#### POST /icebox/calculation/:calculation_id/

Update calculation status

Parameters:

1) status. the new status
2) description. the calculation description

Response: redirect to /icebox/calculations/:calculation_id/
