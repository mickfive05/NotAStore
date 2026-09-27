import { handleEdgeRequest } from '../../../server.js';

Deno.serve((request) => handleEdgeRequest(request));
