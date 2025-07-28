"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ApiError: () => ApiError,
  Conversation: () => Conversation,
  PrioriChat: () => PrioriChat
});
module.exports = __toCommonJS(index_exports);

// src/client/core/params.ts
var extraPrefixesMap = {
  $body_: "body",
  $headers_: "headers",
  $path_: "path",
  $query_: "query"
};
var extraPrefixes = Object.entries(extraPrefixesMap);

// src/client/client/client.ts
var import_axios = __toESM(require("axios"));

// src/client/core/auth.ts
var getAuthToken = async (auth, callback) => {
  const token = typeof callback === "function" ? await callback(auth) : callback;
  if (!token) {
    return;
  }
  if (auth.scheme === "bearer") {
    return `Bearer ${token}`;
  }
  if (auth.scheme === "basic") {
    return `Basic ${btoa(token)}`;
  }
  return token;
};

// src/client/core/pathSerializer.ts
var separatorArrayExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var separatorArrayNoExplode = (style) => {
  switch (style) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
};
var separatorObjectExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var serializeArrayParam = ({
  allowReserved,
  explode,
  name,
  style,
  value
}) => {
  if (!explode) {
    const joinedValues2 = (allowReserved ? value : value.map((v) => encodeURIComponent(v))).join(separatorArrayNoExplode(style));
    switch (style) {
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      case "simple":
        return joinedValues2;
      default:
        return `${name}=${joinedValues2}`;
    }
  }
  const separator = separatorArrayExplode(style);
  const joinedValues = value.map((v) => {
    if (style === "label" || style === "simple") {
      return allowReserved ? v : encodeURIComponent(v);
    }
    return serializePrimitiveParam({
      allowReserved,
      name,
      value: v
    });
  }).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};
var serializePrimitiveParam = ({
  allowReserved,
  name,
  value
}) => {
  if (value === void 0 || value === null) {
    return "";
  }
  if (typeof value === "object") {
    throw new Error(
      "Deeply-nested arrays/objects aren\u2019t supported. Provide your own `querySerializer()` to handle these."
    );
  }
  return `${name}=${allowReserved ? value : encodeURIComponent(value)}`;
};
var serializeObjectParam = ({
  allowReserved,
  explode,
  name,
  style,
  value,
  valueOnly
}) => {
  if (value instanceof Date) {
    return valueOnly ? value.toISOString() : `${name}=${value.toISOString()}`;
  }
  if (style !== "deepObject" && !explode) {
    let values = [];
    Object.entries(value).forEach(([key, v]) => {
      values = [
        ...values,
        key,
        allowReserved ? v : encodeURIComponent(v)
      ];
    });
    const joinedValues2 = values.join(",");
    switch (style) {
      case "form":
        return `${name}=${joinedValues2}`;
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      default:
        return joinedValues2;
    }
  }
  const separator = separatorObjectExplode(style);
  const joinedValues = Object.entries(value).map(
    ([key, v]) => serializePrimitiveParam({
      allowReserved,
      name: style === "deepObject" ? `${name}[${key}]` : key,
      value: v
    })
  ).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};

// src/client/client/utils.ts
var PATH_PARAM_RE = /\{[^{}]+\}/g;
var defaultPathSerializer = ({ path, url: _url }) => {
  let url = _url;
  const matches = _url.match(PATH_PARAM_RE);
  if (matches) {
    for (const match of matches) {
      let explode = false;
      let name = match.substring(1, match.length - 1);
      let style = "simple";
      if (name.endsWith("*")) {
        explode = true;
        name = name.substring(0, name.length - 1);
      }
      if (name.startsWith(".")) {
        name = name.substring(1);
        style = "label";
      } else if (name.startsWith(";")) {
        name = name.substring(1);
        style = "matrix";
      }
      const value = path[name];
      if (value === void 0 || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        url = url.replace(
          match,
          serializeArrayParam({ explode, name, style, value })
        );
        continue;
      }
      if (typeof value === "object") {
        url = url.replace(
          match,
          serializeObjectParam({
            explode,
            name,
            style,
            value,
            valueOnly: true
          })
        );
        continue;
      }
      if (style === "matrix") {
        url = url.replace(
          match,
          `;${serializePrimitiveParam({
            name,
            value
          })}`
        );
        continue;
      }
      const replaceValue = encodeURIComponent(
        style === "label" ? `.${value}` : value
      );
      url = url.replace(match, replaceValue);
    }
  }
  return url;
};
var createQuerySerializer = ({
  allowReserved,
  array,
  object
} = {}) => {
  const querySerializer = (queryParams) => {
    const search = [];
    if (queryParams && typeof queryParams === "object") {
      for (const name in queryParams) {
        const value = queryParams[name];
        if (value === void 0 || value === null) {
          continue;
        }
        if (Array.isArray(value)) {
          const serializedArray = serializeArrayParam({
            allowReserved,
            explode: true,
            name,
            style: "form",
            value,
            ...array
          });
          if (serializedArray) search.push(serializedArray);
        } else if (typeof value === "object") {
          const serializedObject = serializeObjectParam({
            allowReserved,
            explode: true,
            name,
            style: "deepObject",
            value,
            ...object
          });
          if (serializedObject) search.push(serializedObject);
        } else {
          const serializedPrimitive = serializePrimitiveParam({
            allowReserved,
            name,
            value
          });
          if (serializedPrimitive) search.push(serializedPrimitive);
        }
      }
    }
    return search.join("&");
  };
  return querySerializer;
};
var setAuthParams = async ({
  security,
  ...options
}) => {
  for (const auth of security) {
    const token = await getAuthToken(auth, options.auth);
    if (!token) {
      continue;
    }
    const name = auth.name ?? "Authorization";
    switch (auth.in) {
      case "query":
        if (!options.query) {
          options.query = {};
        }
        options.query[name] = token;
        break;
      case "cookie": {
        const value = `${name}=${token}`;
        if ("Cookie" in options.headers && options.headers["Cookie"]) {
          options.headers["Cookie"] = `${options.headers["Cookie"]}; ${value}`;
        } else {
          options.headers["Cookie"] = value;
        }
        break;
      }
      case "header":
      default:
        options.headers[name] = token;
        break;
    }
    return;
  }
};
var buildUrl = (options) => {
  const url = getUrl({
    path: options.path,
    // let `paramsSerializer()` handle query params if it exists
    query: !options.paramsSerializer ? options.query : void 0,
    querySerializer: typeof options.querySerializer === "function" ? options.querySerializer : createQuerySerializer(options.querySerializer),
    url: options.url
  });
  return url;
};
var getUrl = ({
  path,
  query,
  querySerializer,
  url: _url
}) => {
  const pathUrl = _url.startsWith("/") ? _url : `/${_url}`;
  let url = pathUrl;
  if (path) {
    url = defaultPathSerializer({ path, url });
  }
  let search = query ? querySerializer(query) : "";
  if (search.startsWith("?")) {
    search = search.substring(1);
  }
  if (search) {
    url += `?${search}`;
  }
  return url;
};
var mergeConfigs = (a, b) => {
  const config = { ...a, ...b };
  config.headers = mergeHeaders(a.headers, b.headers);
  return config;
};
var axiosHeadersKeywords = [
  "common",
  "delete",
  "get",
  "head",
  "patch",
  "post",
  "put"
];
var mergeHeaders = (...headers) => {
  const mergedHeaders = {};
  for (const header of headers) {
    if (!header || typeof header !== "object") {
      continue;
    }
    const iterator = Object.entries(header);
    for (const [key, value] of iterator) {
      if (axiosHeadersKeywords.includes(
        key
      ) && typeof value === "object") {
        mergedHeaders[key] = {
          ...mergedHeaders[key],
          ...value
        };
      } else if (value === null) {
        delete mergedHeaders[key];
      } else if (Array.isArray(value)) {
        for (const v of value) {
          mergedHeaders[key] = [...mergedHeaders[key] ?? [], v];
        }
      } else if (value !== void 0) {
        mergedHeaders[key] = typeof value === "object" ? JSON.stringify(value) : value;
      }
    }
  }
  return mergedHeaders;
};
var createConfig = (override = {}) => ({
  ...override
});

// src/client/client/client.ts
var createClient = (config = {}) => {
  let _config = mergeConfigs(createConfig(), config);
  const { auth, ...configWithoutAuth } = _config;
  const instance = import_axios.default.create(configWithoutAuth);
  const getConfig = () => ({ ..._config });
  const setConfig = (config2) => {
    _config = mergeConfigs(_config, config2);
    instance.defaults = {
      ...instance.defaults,
      ..._config,
      // @ts-expect-error
      headers: mergeHeaders(instance.defaults.headers, _config.headers)
    };
    return getConfig();
  };
  const request = async (options) => {
    const opts = {
      ..._config,
      ...options,
      axios: options.axios ?? _config.axios ?? instance,
      headers: mergeHeaders(_config.headers, options.headers)
    };
    if (opts.security) {
      await setAuthParams({
        ...opts,
        security: opts.security
      });
    }
    if (opts.requestValidator) {
      await opts.requestValidator(opts);
    }
    if (opts.body && opts.bodySerializer) {
      opts.body = opts.bodySerializer(opts.body);
    }
    const url = buildUrl(opts);
    try {
      const _axios = opts.axios;
      const { auth: auth2, ...optsWithoutAuth } = opts;
      const response = await _axios({
        ...optsWithoutAuth,
        baseURL: opts.baseURL,
        data: opts.body,
        headers: opts.headers,
        // let `paramsSerializer()` handle query params if it exists
        params: opts.paramsSerializer ? opts.query : void 0,
        url
      });
      let { data } = response;
      if (opts.responseType === "json") {
        if (opts.responseValidator) {
          await opts.responseValidator(data);
        }
        if (opts.responseTransformer) {
          data = await opts.responseTransformer(data);
        }
      }
      return {
        ...response,
        data: data ?? {}
      };
    } catch (error) {
      const e = error;
      if (opts.throwOnError) {
        throw e;
      }
      e.error = e.response?.data ?? {};
      return e;
    }
  };
  return {
    buildUrl,
    delete: (options) => request({ ...options, method: "DELETE" }),
    get: (options) => request({ ...options, method: "GET" }),
    getConfig,
    head: (options) => request({ ...options, method: "HEAD" }),
    instance,
    options: (options) => request({ ...options, method: "OPTIONS" }),
    patch: (options) => request({ ...options, method: "PATCH" }),
    post: (options) => request({ ...options, method: "POST" }),
    put: (options) => request({ ...options, method: "PUT" }),
    request,
    setConfig
  };
};

// src/client/client.gen.ts
var client = createClient(
  createConfig({
    throwOnError: true
  })
);

// src/client/sdk.gen.ts
var listApiKeys = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/api-keys",
    ...options
  });
};
var createApiKey = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/api-keys",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deactivateApiKey = (options) => {
  return (options.client ?? client).delete({
    responseType: "json",
    url: "/api/api-keys/{key_id}",
    ...options
  });
};
var listBots = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/bots",
    ...options
  });
};
var createBot = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/bots",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deleteBot = (options) => {
  return (options.client ?? client).delete({
    url: "/api/bots/{bot_id}",
    ...options
  });
};
var getBot = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/bots/{bot_id}",
    ...options
  });
};
var updateBot = (options) => {
  return (options.client ?? client).put({
    responseType: "json",
    url: "/api/bots/{bot_id}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var listContent = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/content",
    ...options
  });
};
var uploadContent = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/content",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deleteContent = (options) => {
  return (options.client ?? client).delete({
    responseType: "json",
    url: "/api/content/{content_id}",
    ...options
  });
};
var listConversations = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/conversations",
    ...options
  });
};
var createConversation = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var getConversation = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/conversations/{id}",
    ...options
  });
};
var getMemories = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/conversations/{id}/memories",
    ...options
  });
};
var sendMessage = (options) => {
  return (options.client ?? client).post({
    url: "/api/conversations/{id}/messages",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};

// src/methods/conversations.ts
async function createConversationImpl(options) {
  const result = await createConversation({
    body: {
      bot_id: options.bot_id,
      user_id: options.user_id,
      create_user_if_not_exists: options.create_user_if_not_exists,
      with_messages: options.with_messages?.map((msg) => ({
        ...msg,
        attached_media: msg.attached_media ? { content_id: "", url: msg.attached_media.url } : void 0
      }))
    }
  });
  return result.data;
}
async function listConversationsImpl(options) {
  const result = await listConversations({
    query: options
  });
  return result.data;
}
async function getConversationImpl(options) {
  const result = await getConversation({
    path: {
      id: options.id
    }
  });
  return result.data;
}

// src/methods/bots.ts
async function createBotImpl(options) {
  const result = await createBot({
    body: options
  });
  return result.data;
}
async function listBotsImpl() {
  const result = await listBots();
  return result.data;
}
async function getBotImpl(options) {
  const result = await getBot({
    path: options
  });
  return result.data;
}
async function updateBotImpl(options) {
  const { bot_id, ...body } = options;
  const result = await updateBot({
    path: { bot_id },
    body
  });
  return result.data;
}
async function deleteBotImpl(options) {
  await deleteBot({
    path: options
  });
}

// src/methods/apiKeys.ts
async function listApiKeysImpl() {
  const result = await listApiKeys();
  return result.data;
}
async function createApiKeyImpl(options) {
  const result = await createApiKey({
    body: options
  });
  return result.data;
}
async function deactivateApiKeyImpl(options) {
  const result = await deactivateApiKey({
    path: options
  });
  return result.data;
}

// src/methods/content.ts
async function listContentImpl(options) {
  const result = await listContent({
    query: options
  });
  return result.data;
}
async function uploadContentImpl(options) {
  const result = await uploadContent({
    body: options
  });
  return result.data;
}
async function deleteContentImpl(options) {
  const result = await deleteContent({
    path: options
  });
  return result.data;
}

// src/conversation.ts
var Conversation = class _Conversation {
  constructor(client2, options, callbacks = {}) {
    __publicField(this, "client");
    __publicField(this, "conversationId");
    __publicField(this, "pollingInterval");
    __publicField(this, "pollingTimer");
    __publicField(this, "lastKnownMessageCount", 0);
    __publicField(this, "callbacks", {});
    __publicField(this, "isInitialized", false);
    this.client = client2;
    this.pollingInterval = options.pollingInterval || 500;
    this.callbacks = callbacks;
  }
  /**
   * Creates a new conversation instance and initializes it.
   * @param client - The PrioriChat client instance
   * @param options - Configuration options for the conversation
   * @param callbacks - Event callbacks for handling conversation events
   * @returns Promise resolving to the conversation instance and initial data containing message history
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const { conversation, initialData } = await Conversation.create(
   *   client,
   *   { user_id: "user-123", bot_id: "12345678-1234-1234-1234-123456789012" },
   *   {
   *     onNewMessage: (message) => {
   *       console.log(`${message.from_bot ? 'Bot' : 'User'}: ${message.text}`);
   *     },
   *     onError: (error) => {
   *       console.error("Error:", error);
   *     }
   *   }
   * );
   * 
   * // Print message history
   * initialData.messages.forEach(msg => {
   *   console.log(`${msg.from_bot ? 'Bot' : 'User'}: ${msg.text}`);
   * });
   * ```
   */
  static async create(client2, options, callbacks = {}) {
    const instance = new _Conversation(client2, options, callbacks);
    const initialData = await instance.initialize(options);
    return { conversation: instance, initialData };
  }
  async initialize(options) {
    try {
      if ("conversation_id" in options) {
        this.conversationId = options.conversation_id;
      } else {
        const existingConversations = await this.client.listConversations({
          user_id: options.user_id,
          bot_id: options.bot_id
        });
        if (existingConversations.conversations.length > 0) {
          this.conversationId = existingConversations.conversations[0].id;
        } else {
          const conversation = await this.client.createConversation({
            user_id: options.user_id,
            bot_id: options.bot_id,
            create_user_if_not_exists: true
          });
          this.conversationId = conversation.conversation.id;
        }
      }
      const initialData = await this.client.getConversation({
        id: this.conversationId
      });
      this.lastKnownMessageCount = initialData.messages.length;
      this.isInitialized = true;
      if (this.callbacks.onInitialData) {
        this.callbacks.onInitialData(initialData);
      }
      this.startPolling();
      return initialData;
    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      throw error;
    }
  }
  startPolling() {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
    }
    this.pollingTimer = setInterval(async () => {
      try {
        const data = await this.client.getConversation({
          id: this.conversationId
        });
        if (data.messages.length > this.lastKnownMessageCount) {
          const newMessages = data.messages.slice(this.lastKnownMessageCount);
          this.lastKnownMessageCount = data.messages.length;
          if (this.callbacks.onNewMessage) {
            newMessages.forEach((apiMessage) => {
              const message = {
                id: apiMessage.id || void 0,
                text: apiMessage.text,
                from_bot: apiMessage.from_bot,
                attached_media: apiMessage.attached_media ? { url: apiMessage.attached_media.url } : void 0,
                sent_at: Math.floor(Date.now() / 1e3)
              };
              this.callbacks.onNewMessage(message);
            });
          }
        }
      } catch (error) {
        if (this.callbacks.onError) {
          this.callbacks.onError(error);
        }
      }
    }, this.pollingInterval);
  }
  /**
   * Sends a message to the conversation
   * @param text - The text content of the message
   * @param attachedMedia - Optional attached media content
   * @returns Promise that resolves when message is sent
   * @example
   * ```ts
   * // Send a simple text message
   * await conversation.sendMessage("Hello, how can you help me?");
   * 
   * // Send a message with media attachment
   * await conversation.sendMessage("Here's an image", {
   *   url: "https://example.com/image.jpg"
   * });
   * 
   * // Continue the conversation by sending more messages
   * // The onNewMessage callback will handle bot responses
   * ```
   */
  async sendMessage(text, attachedMedia) {
    if (!this.isInitialized) {
      throw new Error("Conversation not initialized");
    }
    const message = {
      text,
      from_bot: false,
      attached_media: attachedMedia,
      id: `temp-${Date.now()}`,
      sent_at: Math.floor(Date.now() / 1e3)
    };
    if (this.callbacks.onNewMessage) {
      this.callbacks.onNewMessage(message);
    }
    try {
      await sendMessage({
        path: {
          id: this.conversationId
        },
        body: {
          message: {
            text,
            from_bot: false,
            attached_media: attachedMedia ? { content_id: "", url: attachedMedia.url } : void 0
          }
        }
      });
      this.lastKnownMessageCount++;
    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      throw error;
    }
  }
  /**
   * Stops polling for new messages and cleans up resources.
   * Call this method when you're done with the conversation to prevent memory leaks.
   * @example
   * ```ts
   * // Always disconnect when done
   * conversation.disconnect();
   * 
   * // Or use in React useEffect cleanup
   * useEffect(() => {
   *   const setupConversation = async () => {
   *     const { conversation } = await client.conversation(...);
   *     setConversation(conversation);
   *   };
   *   
   *   setupConversation();
   *   
   *   return () => {
   *     conversation?.disconnect();
   *   };
   * }, []);
   * ```
   */
  disconnect() {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = void 0;
    }
  }
  // /**
  //  * Updates the polling interval
  //  * @param interval - New polling interval in milliseconds
  //  */
  // setPollingInterval(interval: number) {
  //   this.pollingInterval = interval;
  //   if (this.pollingTimer && this.isInitialized) {
  //     this.startPolling();
  //   }
  // }
  /**
   * Retrieves bot and user memories for this conversation.
   * @returns Promise resolving to memories data containing bot_memories and user_memories arrays
   */
  async getMemories() {
    if (!this.isInitialized) {
      throw new Error("Conversation not initialized");
    }
    return (await getMemories({
      path: {
        id: this.conversationId
      }
    })).data;
  }
  /**
   * Gets the current conversation ID.
   * @returns The conversation ID string
   * @example
   * ```ts
   * console.log(`Current conversation: ${conversation.id}`);
   * // Output: Current conversation: 87654321-4321-4321-4321-210987654321
   * ```
   */
  get id() {
    return this.conversationId;
  }
};

// src/client.ts
var ApiError = class extends Error {
  constructor({
    message,
    status,
    method,
    url,
    payload
  }) {
    super(message);
    __publicField(this, "name", "ApiError");
    __publicField(this, "status");
    __publicField(this, "method");
    __publicField(this, "url");
    __publicField(this, "payload");
    this.status = status;
    this.method = method;
    this.url = url;
    this.payload = payload;
  }
};
var PrioriChat = class {
  constructor(api_token, baseURL) {
    __publicField(this, "client", client);
    __publicField(this, "authHeader");
    this.authHeader = api_token;
    this.client.setConfig({
      baseURL: baseURL || "https://api.prioros.com/v3/",
      throwOnError: true
    });
    this.setupAuthInterceptor();
    this.setupErrorInterceptor();
  }
  setAuthHeader(authHeader) {
    this.authHeader = authHeader;
    this.setupAuthInterceptor();
  }
  setupAuthInterceptor() {
    this.client.instance.interceptors.request.use((config) => {
      config.headers.set("Authorization", `Bearer ${this.authHeader}`);
      return config;
    });
  }
  setupErrorInterceptor() {
    this.client.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const res = error.response;
        const req = res?.config;
        const data = res?.data;
        const status = res?.status;
        const method = req?.method?.toUpperCase();
        const url = req?.url;
        const hasJsonBody = res?.headers?.["content-type"]?.includes("application/json");
        const hasMessageField = data && typeof data === "object" && "message" in data;
        if (hasJsonBody && hasMessageField) {
          throw new ApiError({
            message: `[${status} ${res.statusText}] ${method} ${url} ? ${String(data.message)}`,
            status,
            method,
            url,
            payload: data
          });
        }
        const parts = [];
        if (status) parts.push(`[${status} ${res.statusText}]`);
        if (method && url) parts.push(`${method} ${url}`);
        if (data?.error) parts.push(`? ${String(data.error)}`);
        error.message = parts.join(" ") || error.message;
        error.meta = {
          status,
          method,
          url,
          payload: data,
          response: res
        };
        return Promise.reject(error);
      }
    );
  }
  /**
   * Creates a new conversation between a user and bot
   * @param options - The conversation creation options
   * @param options.bot_id - ID of the bot to associate with this conversation
   * @param options.user_id - ID of the user to associate with this conversation
   * @param options.create_user_if_not_exists - Whether to create the user if they don't exist (defaults to true)
   * @param options.with_messages - Optional list of initial messages for the conversation
   * @returns Promise resolving to the created conversation
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.createConversation({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   user_id: "user-123",
   *   create_user_if_not_exists: true
   * });
   * 
   * console.log(`Created conversation: ${result.conversation.id}`);
   * ```
   */
  async createConversation(options) {
    return createConversationImpl.call(this, options);
  }
  /**
   * Lists conversations with optional filtering
   * @param options - Optional filtering options including bot_id, user_id, conversation_id, min_messages, max_messages, message_content, min_last_message_date, max_last_message_date
   * @returns Promise resolving to list of conversations
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * // List all conversations
   * const allConversations = await client.listConversations();
   * 
   * // List conversations for a specific user and bot
   * const userConversations = await client.listConversations({
   *   user_id: "user-123",
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   * ```
   */
  async listConversations(options) {
    return listConversationsImpl.call(this, options);
  }
  /**
   * Retrieves a specific conversation by ID
   * @param options - The conversation retrieval options
   * @param options.id - The ID of the conversation to retrieve
   * @returns Promise resolving to the conversation details
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const conversation = await client.getConversation({
   *   id: "87654321-4321-4321-4321-210987654321"
   * });
   * 
   * console.log(`Found ${conversation.messages.length} messages`);
   * ```
   */
  async getConversation(options) {
    return getConversationImpl.call(this, options);
  }
  /**
   * Creates a new Conversation instance for real-time messaging
   * @param options - Conversation initialization options (conversation_id OR user_id + bot_id)
   * @param callbacks - Event callbacks for handling messages and errors
   * @returns Promise resolving to conversation instance and initial data
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const { conversation, initialData } = await client.conversation(
   *   { user_id: "user-123", bot_id: "12345678-1234-1234-1234-123456789012" },
   *   {
   *     onNewMessage: (message) => {
   *       if (message.from_bot) {
   *         console.log(`Bot: ${message.text}`);
   *       }
   *     },
   *     onError: (error) => {
   *       console.error("Conversation error:", error);
   *     }
   *   }
   * );
   * 
   * // Print initial message history
   * console.log(`Loaded ${initialData.messages.length} previous messages`);
   * initialData.messages.forEach(msg => {
   *   const sender = msg.from_bot ? "Bot" : "User";
   *   console.log(`${sender}: ${msg.text}`);
   * });
   * 
   * // Send a message to start/continue the conversation
   * await conversation.sendMessage("Hello!");
   * 
   * // Continue the conversation by sending more messages
   * // The onNewMessage callback will handle incoming bot responses
   * ```
   */
  async conversation(options, callbacks) {
    return Conversation.create(this, options, callbacks);
  }
  /**
   * Creates a new bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.createBot({
   *   name: "My Assistant Bot"
   * });
   * 
   * console.log(`Created bot: ${result.bot.id}`);
   * ```
   */
  async createBot(options) {
    return createBotImpl.call(this, options);
  }
  /**
   * Lists all bots
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.listBots();
   * console.log(`Found ${result.bots.length} bots`);
   * ```
   */
  async listBots() {
    return listBotsImpl.call(this);
  }
  /**
   * Retrieves a specific bot by ID
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.getBot({
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   * 
   * console.log(`Bot name: ${result.bot.name}`);
   * ```
   */
  async getBot(options) {
    return getBotImpl.call(this, options);
  }
  /**
   * Updates an existing bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.updateBot({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   name: "Updated Bot Name"
   * });
   * 
   * console.log(`Updated bot: ${result.bot.name}`);
   * ```
   */
  async updateBot(options) {
    return updateBotImpl.call(this, options);
  }
  /**
   * Deletes a bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * await client.deleteBot({
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   * 
   * console.log("Bot deleted successfully");
   * ```
   */
  async deleteBot(options) {
    return deleteBotImpl.call(this, options);
  }
  /**
   * Lists all API keys
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.listApiKeys();
   * console.log(`Found ${result.api_keys.length} API keys`);
   * ```
   */
  async listApiKeys() {
    return listApiKeysImpl.call(this);
  }
  /**
   * Creates a new API key
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.createApiKey({
   *   name: "My API Key"
   * });
   * 
   * console.log(`Created API key: ${result.key_info.id}`);
   * console.log(`API key: ${result.api_key}`);
   * ```
   */
  async createApiKey(options) {
    return createApiKeyImpl.call(this, options);
  }
  /**
   * Deactivates an API key
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.deactivateApiKey({
   *   key_id: "12345678-1234-1234-1234-123456789012"
   * });
   * 
   * console.log(result.message);
   * ```
   */
  async deactivateApiKey(options) {
    return deactivateApiKeyImpl.call(this, options);
  }
  /**
   * Lists content for a bot with optional filtering
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * // List all content for a bot
   * const result = await client.listContent({
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   * 
   * // List with search and filtering
   * const filteredResult = await client.listContent({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   search: "vacation pics",
   *   media_type: "image",
   *   limit: 10
   * });
   * 
   * console.log(`Found ${result.content.length} items`);
   * ```
   */
  async listContent(options) {
    return listContentImpl.call(this, options);
  }
  /**
   * Uploads content from an image URL to a bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.uploadContent({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   image_url: "https://example.com/image.jpg"
   * });
   * 
   * console.log(`Uploaded content: ${result.content.content_id}`);
   * console.log(`Content URL: ${result.content.url}`);
   * ```
   */
  async uploadContent(options) {
    return uploadContentImpl.call(this, options);
  }
  /**
   * Deletes content by ID
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const result = await client.deleteContent({
   *   content_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
   * });
   * 
   * console.log(result.message); // "Content deleted successfully"
   * ```
   */
  async deleteContent(options) {
    return deleteContentImpl.call(this, options);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiError,
  Conversation,
  PrioriChat
});
