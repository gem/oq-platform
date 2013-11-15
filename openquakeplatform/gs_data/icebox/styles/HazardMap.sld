<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor 
   version="1.0.0"
   xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
   xmlns="http://www.opengis.net/sld"
   xmlns:ogc="http://www.opengis.net/ogc"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>HazardMap Style</Name>
    <UserStyle>
      <Title>Hazard Map Style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>iml</Name>
          <Title>Color ramp based on iml: black(0) to red(10)</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">
                    <ogc:Function name="Interpolate">
                      <ogc:PropertyName>iml</ogc:PropertyName>
                      <ogc:Literal>0</ogc:Literal> <ogc:Literal>#000000</ogc:Literal>
                      <ogc:Literal>10</ogc:Literal> <ogc:Literal>#ff0000</ogc:Literal>
                      <ogc:Literal>color</ogc:Literal>
                    </ogc:Function>
                  </CssParameter>
                </Fill>
              </Mark>
              <Size>3</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
