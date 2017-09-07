'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _CarouselCaption = require('./CarouselCaption');

var _CarouselCaption2 = _interopRequireDefault(_CarouselCaption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CarouselItem = function (_React$Component) {
  _inherits(CarouselItem, _React$Component);

  function CarouselItem(props) {
    _classCallCheck(this, CarouselItem);

    var _this = _possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

    _this.state = { animation: [] };
    return _this;
  }

  _createClass(CarouselItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.willEnterTimeout);
      clearTimeout(this.willLeaveTimeout);
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callBack) {
      this.setState({
        animation: ['active']
      });
      callBack();
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callBack) {
      var classes = this.context.direction === 'right' ? ['carousel-item-next', 'carousel-item-left'] : ['carousel-item-prev', 'carousel-item-right'];
      this.setState({
        animation: classes
      });

      this.willEnterTimeout = setTimeout(function () {
        callBack();
      }, 500);
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      this.setState({
        animation: ['active']
      });
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callBack) {
      var classes = this.context.direction === 'right' ? ['carousel-item-left', 'active'] : ['carousel-item-right', 'active'];
      this.setState({
        animation: classes
      });

      this.slide.dispatchEvent(new CustomEvent('slide.bs.carousel'));

      this.willLeaveTimeout = setTimeout(function () {
        callBack();
      }, 500);
    }
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave() {
      this.setState({
        animation: []
      });
      this.slide.dispatchEvent(new CustomEvent('slid.bs.carousel'));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          altText = _props.altText,
          children = _props.children,
          cssModule = _props.cssModule;

      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(
      // 'd-block',
      'img-fluid'), cssModule);

      var itemClasses = (0, _utils.mapToCssModules)(_classnames2.default.apply(undefined, ['carousel-item'].concat(_toConsumableArray(this.state.animation))), cssModule);

      return _react2.default.createElement(
        'div',
        { className: itemClasses, ref: function ref(slide) {
            _this2.slide = slide;
          } },
        _react2.default.createElement('img', { className: classes, alt: altText }),
        children
      );
    }
  }]);

  return CarouselItem;
}(_react2.default.Component);

CarouselItem.propTypes = {
  altText: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

CarouselItem.contextTypes = {
  direction: _propTypes2.default.string
};

exports.default = CarouselItem;