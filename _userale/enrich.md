---
layout: workflow
title: Enrich Data
wf_code: WF_ENRICH
css_class: wf_enrich
permalink: /wf_states/enrich/
---
#Description

In Enrich, the user actively adds insight value back into the tool.  Activities include annotating/tagging/labeling data with textual notes or links, bookmarking views, creating links between data elements.  Annotations may include external insight (from SMEs), algorithmic results (searching for patterns, denoising, etc.), identifying patterns/trends,  (Making notes or conclusions about patterns is in Enrich. Identifying/searching for them is in Transform.)

#Example Usages

<ul class="list-group">
  <li class="list-group-item">
    <h5>If you are...</h5>
    <p style="margin-left: 15px; ">
      Letting the user organize their data, in a sandbox or workspace
    </p>

    <h5>Consider the following activities...</h5>
    <div style="margin-left: 15px;">
      <code>create_workspace, remove_workspace,
add_to_workspace, remove_from_workspace, clear_workspace,
export_data, import_data</code>
    </div>
  </li>
  <li class="list-group-item">
    <h5>If you are...</h5>
    <p style="margin-left: 15px; ">
      Letting your user annotate or mark the data. This is an active process of having the user document their insight within your tool
    </p>

    <h5>Consider the following activities...</h5>
    <div style="margin-left: 15px;">
      <code>annotate_graph, annotate_plot, annotate_chart, annotate_map,
remove_graph_annotation, remove_map_annotation, remove_chart_annotation,
bookmark_view, add_note, remove_note, highlight_data</code>
    </div>
  </li>
</ul>