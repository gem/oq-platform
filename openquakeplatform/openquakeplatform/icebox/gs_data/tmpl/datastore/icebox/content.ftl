<#list features as feature>
  <#if feature.type.name[14..24] == "hazardcurve" >
  <h4>${feature.location.value}</h4>
  <div 
     style="display:none" class="curve to_draw"
     data-x="${feature.imls.value}"
     data-y="${feature.poes.value}">
  </div>
  </#if>

  <#if feature.type.name[14..22] == "losscurve" >
  <h4>${feature.location.value}</h4>
  <div 
     style="display:none" class="curve to_draw"
     data-x="${feature.losses.value}"
     data-y="${feature.poes.value}">
  </div>
  </#if>

  <#if feature.type.name[14..22] == "aggregatelosscurve" >
  <h4>${feature.location.value}</h4>
  <div 
     style="display:none" class="curve to_draw"
     data-x="${feature.losses.value}"
     data-y="${feature.poes.value}">
  </div>
  </#if>

</#list>

