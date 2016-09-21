# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#!/bin/bash
REPO='xdata_backup'
echo " * Initializing $REPO"
response=$(curl -s -XPUT "http://localhost:9200/_snapshot/$REPO" -d "{ \"type\": \"fs\", \"settings\": { \"location\": \"$BACKUPDIR\", \"max_snapshot_bytes_per_sec\": \"50mb\", \"max_restore_bytes_per_sec\": \"50mb\" }}")
if [[ "$response" != *"\"acknowledged\":true"* ]]; then
  echo " Error: Unable to create backup repository:"
  echo "$response"
fi
echo "   ...done."
