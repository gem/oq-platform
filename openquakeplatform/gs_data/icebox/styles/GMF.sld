<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>GMF Style</Name>
    <UserStyle>
      <Title>GMF Style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name>Color depending on gmv</Name>
          <Title>Color depending on gmv: blue(0) to green(10)</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>square</WellKnownName>
                <Fill>
                  <CssParameter name="fill">
                    <ogc:Function name="Interpolate">
                      <ogc:PropertyName>iml</ogc:PropertyName>
                      <ogc:Literal>0</ogc:Literal> <ogc:Literal>#0000ff</ogc:Literal>
                      <ogc:Literal>10</ogc:Literal> <ogc:Literal>#00ff00</ogc:Literal>
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
