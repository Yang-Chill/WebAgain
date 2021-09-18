"use strict";

var ychEvent = function () {
  var clientList = {},
      listen,
      trigger,
      remove; // 订阅

  listen = function listen(key, fn) {
    // 订阅key类消息
    if (!clientList[key]) {
      // 初始化
      clientList[key] = [];
    }

    clientList[key].push(fn);
  }; // 发布并通知


  trigger = function trigger() {
    var key = Array.prototype.shift.call(arguments),
        fns = clientList[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  }; // 取消订阅


  remove = function remove(key, fn) {
    var fns = clientList[key];

    if (fns) {
      if (!fn) {
        fns && (fns.length = 0);
      } else {
        for (var l = fns.lenght - 1; l >= 0; l--) {
          if (fns[l] === fn) {
            fns.splice(l, 1);
          }
        }
      }
    }
  };

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  };
}();

ychEvent.listen("event1", function (num) {
  console.log("event1 hear " + num);
});
ychEvent.trigger("event1", 20);
/* let Event = (function () {
    let global = this,
        event, _default = 'default';

    // 订阅-发布模式
    event = function () {

        let cache = {},
            _listen,
            _trigger,
            _remove, _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find,
            each = function (ary, fn) {
                let ret;
                for (let i = 0, l = ary.length; i < l; i++) {
                    let n = ary[i];
                    ret = fn.call(n, i, n);
                }
                return ret;
            };

        // 进行订阅
        _listen = function (key, fn) {

            // 订阅key类消息
            if (!cache[key]) {
                // 初始化
                cache[key] = [];
            }
            cache[key].push(fn);

        };

        // 发布
        _trigger = function () {
            let cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                _self = this,
                fns = cache[key];
            if (!fns || fns.length === 0) {
                return false;
            }
            return each(fns, function () {
                return this.apply(_self, args);
            });
        };
        // 取消订阅
        _remove = function (key, cache, fn) {
            let fns = cache[key];
            if (!fns) {
                return;
            }
            if (!fn) {
                cache[key] = [];
            } else {
                for (let i = fns.lenght - 1; i >= 0; i--) {
                    let _fn = fns[i];
                    if (_fn === fn) {
                        fns.splice(i, 1); // 删除改订阅
                    }
                }
            }
        };
        // 创建命名空间
        _create = function (namespace) {
            let namespace = namespace || _default;
            let cache = {},
                offlineStack = [], // 离线事件
            ret = {
                listen: function (key, fn, last) {
                    _listen(key, fn, cache);
                    if (offlineStack === null) {
                        return;
                    }
                    if (last === 'last') {
                        offlineStack.length && offlineStack.pop()();
                    } else {
                        each(offlineStack, function () {
                            this();
                        });
                    }
                    offlineStack = null;
                },

                one: function (key, fn, last) {
                    _remove(key, cache);
                    this.listen(key, fn, last);
                },
                remove: function (ikey, fn) {
                    _remove(key, cache, fn);
                },
                trigger: function () {
                    let fn, args, _self = this;
                    _unshift.call(arguments, cache);
                    args = arguments;
                    fn = function () {
                        return _trigger.apply(_self, args);
                    };
                    if (offlineStack) {
                        return offlineStack.push(fn);
                    }
                    return fn();
                }
            };

            return namespace ?
                (
                    namespaceCache[namespace] ?
                    namespaceCache[namespace] :
                    namespaceCache[namespace] = ret
                ) :
                ret;
        };

        return {
            create: _create,
            one: function (key, fn, last) {
                let event = this.create();
                event.one(key, fn, last);
            },
            remove: function (key, fn) {
                let event = this.create();
                event.remove(key, fn);
            },
            listen: function (key, fn, last) {
                let event = this.create();
                event.listen(key, fn, last);
            },
            trigger: function () {
                let event = this.create();
                event.trigger.apply(this, arguments);
            }
        };

    };

    return event;
})();

Event.create('space1').listen('event1', function() {
    console.log("space1 -> event1");
}); */