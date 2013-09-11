<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>ghec_viewer_measure</Name>
    <UserStyle>
      <Title>GeoServer SLD Cook Book: Attribute-based point</Title>
      <FeatureTypeStyle>
     <Rule>
       <Name> m &lt; 7 AND depth &lt; 70 km</Name>
       <Title> m &lt; 7 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND depth &lt; 70 km</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND depth &lt; 70 km</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND depth &lt; 70 km</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND depth &lt; 70 km</Name>
       <Title> 8.5 &lt;= m AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>


           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>37</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND 70km &lt;= depth</Name>
       <Title> m &lt; 7 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND 70km &lt;= depth</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND 70km &lt;= depth</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND 70km &lt;= depth</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND 70km &lt;= depth</Name>
       <Title> 8.5 &lt;= m AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>37</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND unknown depth</Name>
       <Title> m &lt; 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>5</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND unknown depth</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>13</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND unknown depth</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>21</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND unknown depth</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>29</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND unknown depth</Name>
       <Title> 8.5 &lt;= m AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MaxScaleDenominator>17471330</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>37</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND depth &lt; 70 km</Name>
       <Title> m &lt; 7 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND depth &lt; 70 km</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND depth &lt; 70 km</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND depth &lt; 70 km</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND depth &lt; 70 km</Name>
       <Title> 8.5 &lt;= m AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>


           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>28</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND 70km &lt;= depth</Name>
       <Title> m &lt; 7 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND 70km &lt;= depth</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND 70km &lt;= depth</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND 70km &lt;= depth</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND 70km &lt;= depth</Name>
       <Title> 8.5 &lt;= m AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>28</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND unknown depth</Name>
       <Title> m &lt; 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>4</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND unknown depth</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>10</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND unknown depth</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>16</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND unknown depth</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>22</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND unknown depth</Name>
       <Title> 8.5 &lt;= m AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>28</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND depth &lt; 70 km</Name>
       <Title> m &lt; 7 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND depth &lt; 70 km</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND depth &lt; 70 km</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND depth &lt; 70 km</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThan>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND depth &lt; 70 km</Name>
       <Title> 8.5 &lt;= m AND depth &lt; 70 km</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>


           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsLessThan>
         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#FF0000</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND 70km &lt;= depth</Name>
       <Title> m &lt; 7 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>

           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND 70km &lt;= depth</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND 70km &lt;= depth</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND 70km &lt;= depth</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>
           <ogc:PropertyIsLessThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThan>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND 70km &lt;= depth</Name>
       <Title> 8.5 &lt;= m AND 70km &lt;= depth</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

           <ogc:PropertyIsGreaterThanOrEqualTo>
               <ogc:PropertyName>dep</ogc:PropertyName>
               <ogc:Literal>70</ogc:Literal>
               </ogc:PropertyIsGreaterThanOrEqualTo>

         </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#00FBFB</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> m &lt; 7 AND unknown depth</Name>
       <Title> m &lt; 7 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>

             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>3</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7 &lt;= m &lt; 7.5 AND unknown depth</Name>
       <Title> 7 &lt;= m &lt; 7.5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>7</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 7.5 &lt;= m &lt; 8 AND unknown depth</Name>
       <Title> 7.5 &lt;= m &lt; 8 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>7.5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>11</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8 &lt;= m &lt; 8.5 AND unknown depth</Name>
       <Title> 8 &lt;= m &lt; 8.5 AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.0</ogc:Literal>
               </ogc:PropertyIsGreaterThan>
             <ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>
           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>15</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
     <Rule>
       <Name> 8.5 &lt;= m AND unknown depth</Name>
       <Title> 8.5 &lt;= m AND unknown depth</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>dep</ogc:PropertyName>
             </ogc:PropertyIsNull>
             <ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>m</ogc:PropertyName>
               <ogc:Literal>8.5</ogc:Literal>
               </ogc:PropertyIsGreaterThan>

           </ogc:And>
       </ogc:Filter>
       <MinScaleDenominator>69885320</MinScaleDenominator>
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>star</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
           </Mark>
           <Size>19</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
