<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>BCR Style</Name>
    <UserStyle>
      <Title>BCR Style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>Color depending on bcr</Name>
          <Title>Color depending on bcr: white(0) to red(10)</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">
                    <ogc:Function name="Interpolate">
                      <ogc:PropertyName>bcr</ogc:PropertyName>
                      <ogc:Literal>0</ogc:Literal> <ogc:Literal>#ffffff</ogc:Literal>
                      <ogc:Literal>10</ogc:Literal> <ogc:Literal>#ff0000</ogc:Literal>
                      <ogc:Literal>color</ogc:Literal>
                    </ogc:Function>
                  </CssParameter>
                </Fill>
              </Mark>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
