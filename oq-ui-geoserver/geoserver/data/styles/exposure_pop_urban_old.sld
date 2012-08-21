<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>exposure_pop_urban</sld:Name>
    <sld:UserStyle>
      <sld:Name>exposure_pop_urban</sld:Name>
      <sld:Title>A boring default style</sld:Title>
      <sld:IsDefault>1</sld:IsDefault>
      <sld:Abstract>A sample style for rasters</sld:Abstract>
      <sld:FeatureTypeStyle>
        <sld:Name>name</sld:Name>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:Geometry>
              <ogc:PropertyName>geom</ogc:PropertyName>
            </sld:Geometry>
            <sld:ColorMap>
              <sld:ColorMapEntry color="#FFFFFF" opacity="0" quantity="0"/>
              <sld:ColorMapEntry color="#f8f8fa" opacity="0.7" quantity="10"/>
              <sld:ColorMapEntry color="#eff0f3" opacity="0.7" quantity="25"/>
              <sld:ColorMapEntry color="#e5e6ec" opacity="0.7" quantity="50"/>
              <sld:ColorMapEntry color="#d9dbe3" opacity="0.7" quantity="75"/>
              <sld:ColorMapEntry color="#cccfd9" opacity="0.7" quantity="100"/>
              <sld:ColorMapEntry color="#bec2cf" opacity="0.7" quantity="250"/>
              <sld:ColorMapEntry color="#b0b4c5" opacity="0.7" quantity="500"/>
              <sld:ColorMapEntry color="#a0a5b9" opacity="0.7" quantity="750"/>
              <sld:ColorMapEntry color="#9096ad" opacity="0.7" quantity="1000"/>
              <sld:ColorMapEntry color="#7f86a1" opacity="0.7" quantity="2500"/>
              <sld:ColorMapEntry color="#293870" opacity="0.7" quantity="5000"/>
              <sld:ColorMapEntry color="#283461" opacity="0.7" quantity="75000"/>
              <sld:ColorMapEntry color="#1b2857" opacity="0.7" quantity="100000"/>
              <sld:ColorMapEntry color="#0f1d4e" opacity="0.7" quantity="125000"/>
            </sld:ColorMap>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>