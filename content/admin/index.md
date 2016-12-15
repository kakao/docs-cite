---
title: Administration
weight: 40
---

## elasticsearch
```
curl -XPUT http://elasticsearch:9200/_template/cite_template -d '
{
   "template": "*",
   "settings": {
      "index": {
         "number_of_shards": "10"
      }
   },
   "mappings": {
      "_default_": {
         "dynamic_templates": [
            {
               "log_obj": {
                  "path_match": "log_obj.*",
                  "match_mapping_type": "string",
                  "mapping": {
                     "type": "string",
                     "index": "not_analyzed"
                  }
               }
            },
            {
               "kubernetes": {
                  "path_match": "kubernetes.*",
                  "match_mapping_type": "string",
                  "mapping": {
                     "type": "string",
                     "index": "not_analyzed"
                  }
               }
            }
         ]
      }
   }
}
'
```
