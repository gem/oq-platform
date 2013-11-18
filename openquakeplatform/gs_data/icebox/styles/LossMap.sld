<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>LossMap</sld:Name>
    <sld:UserStyle>
      <sld:Name>LossMap</sld:Name>
      <sld:Title>Loss Map Style</sld:Title>
      <sld:IsDefault>1</sld:IsDefault>
      <sld:FeatureTypeStyle>
        <sld:Name>name</sld:Name>
        <sld:Rule>
          <sld:Name>Color depending on Loss</sld:Name>
          <sld:Title>Color depending on Loss: white(0) to red(100000)</sld:Title>
          <sld:PointSymbolizer>
            <sld:Graphic>
              <sld:Mark>
                <sld:WellKnownName>circle</sld:WellKnownName>
                <sld:Fill>
                  <sld:CssParameter name="fill">
                    <ogc:Function name="Interpolate">
                      <ogc:PropertyName>loss</ogc:PropertyName>
                      <ogc:Literal>0</ogc:Literal>
                      <ogc:Literal>#ffffff</ogc:Literal>
                      <ogc:Literal>100</ogc:Literal>
                      <ogc:Literal>#ffff00</ogc:Literal>
                      <ogc:Literal>10000</ogc:Literal>
                      <ogc:Literal>#ff00ff</ogc:Literal>
                      <ogc:Literal>1000000</ogc:Literal>
                      <ogc:Literal>#ff0000</ogc:Literal>
                      <ogc:Literal>color</ogc:Literal>
                    </ogc:Function>
                  </sld:CssParameter>
                </sld:Fill>
              </sld:Mark>
              <sld:Size>4</sld:Size>
            </sld:Graphic>
          </sld:PointSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>
