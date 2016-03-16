Modifying indicators
====================

A project definition is a tree-like hierarchical structure storing information about how
indicators are combined together to build composite indices. Each node of the
tree is associated to an attribute in the layer's data source and to a weight
to be applied to the attribute's values. If a node has any children nodes, also
an operator is specified, defining how to combine the children nodes' values
together. The root of the tree is the Integrated Risk Index (IRI), that is a
composite indicator that takes into account the Risk Index (RI) and the Social
Vulnerability Index (SVI). The RI summarizes the components of the problem that
contribute to the physical risk, whereas the SVI takes into account the social
and economical aspects. The SVI is built aggregating primary socioeconomic
indicators into homogeneous themes, such as "population" or "economy".

When a new project is loaded into an application, you can access its project
definition in the tab labeled "Project Definition". From the project definition
tree one can modify the default weight of any node. A node's contribution can
also be inverted if a user decides a respective attribute should detract from
the overall output.

Once a node's weight has been modified, the charts and the thematic map will be
adjusted to the new values automatically. Please note that if the node
contributes to the calculation of the parent node by means of an operator that
ignores weights, then the map and charts will remain unchanged.
