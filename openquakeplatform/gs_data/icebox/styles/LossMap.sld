<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>Loss Map Style</Name>
    <UserStyle>
      <Title>Loss Map Style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>Color depending on Loss</Name>
          <Title>Color depending on Loss: white(0) to red(100000)</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>triangle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">
                    <ogc:Function name="Interpolate">
                      <ogc:PropertyName>loss</ogc:PropertyName>
                      <ogc:Literal>0</ogc:Literal> <ogc:Literal>#ffffff</ogc:Literal>
                      <ogc:Literal>100000</ogc:Literal> <ogc:Literal>#ff0000</ogc:Literal>
                      <ogc:Literal>color</ogc:Literal>
                    </ogc:Function>
                  </CssParameter>
                </Fill>
                <Stroke>
                  <CssParameter name="stroke">
                    <ogc:Function name="Interpolate">
                      <ogc:PropertyName>stddev_loss</ogc:PropertyName>
                      <ogc:Literal>0</ogc:Literal> <ogc:Literal>#ffffff</ogc:Literal>
                      <ogc:Literal>100000</ogc:Literal> <ogc:Literal>#ff0000</ogc:Literal>
                      <ogc:Literal>color</ogc:Literal>
                    </ogc:Function>
                  </CssParameter>
                </Stroke>
              </Mark>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
