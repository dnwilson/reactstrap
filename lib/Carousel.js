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

var _reactTransitionGroup = require('react-transition-group');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.state = { direction: 'right' };
    return _this;
  }

  _createClass(Carousel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { direction: this.state.direction };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // Set up the cycle
      if (this.props.interval) {
        this.cycleInterval = setInterval(function () {
          if (!_this2.props.paused) {
            _this2.props.next();
          }
        }, parseInt(this.props.interval, 10));
      }

      if (this.props.keyboard) {
        document.addEventListener('keyup', this.handleKeyPress);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Calculate the direction to turn
      if (this.props.activeIndex + 1 === nextProps.activeIndex) {
        this.setState({ direction: 'right' });
      } else if (this.props.activeIndex - 1 === nextProps.activeIndex) {
        this.setState({ direction: 'left' });
      } else if (this.props.activeIndex > nextProps.activeIndex) {
        this.setState({ direction: 'right' });
      } else {
        this.setState({ direction: 'left' });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.cycleInterval);
      document.removeEventListener('key', this.handleKeyPress);
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(evt) {
      if (this.props.keyboard && evt.keyCode === 37) {
        this.props.previous();
      } else if (this.props.keyboard && evt.keyCode === 39) {
        this.props.next();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          cssModule = _props.cssModule,
          activeIndex = _props.activeIndex,
          hoverStart = _props.hoverStart,
          hoverEnd = _props.hoverEnd;

      var outerClasses = (0, _utils.mapToCssModules)((0, _classnames2.default)('carousel', 'slide'), cssModule);

      var innerClasses = (0, _utils.mapToCssModules)((0, _classnames2.default)('carousel-inner'), cssModule);

      var slidesOnly = children.every(function (child) {
        return child.type && child.type.name === 'CarouselItem';
      });

      // Rendering only slides
      if (slidesOnly) {
        return _react2.default.createElement(
          'div',
          { className: outerClasses, onMouseEnter: hoverStart, onMouseLeave: hoverEnd },
          _react2.default.createElement(
            _reactTransitionGroup.TransitionGroup,
            { component: 'div', role: 'listbox', className: innerClasses },
            children[activeIndex]
          )
        );
      }

      // Rendering slides and controls
      if (children[0] instanceof Array) {
        var _carouselItems = children[0];
        var _controlLeft = children[1];
        var _controlRight = children[2];

        return _react2.default.createElement(
          'div',
          { className: outerClasses, onMouseEnter: hoverStart, onMouseLeave: hoverEnd },
          _react2.default.createElement(
            _reactTransitionGroup.TransitionGroup,
            { component: 'div', role: 'listbox', className: innerClasses },
            _carouselItems[activeIndex]
          ),
          _controlLeft,
          _controlRight
        );
      }

      // Rendering indicators, slides and controls
      var indicators = children[0];
      var carouselItems = children[1];
      var controlLeft = children[2];
      var controlRight = children[3];

      return _react2.default.createElement(
        'div',
        { ref: function ref(carousel) {
            _this3.carousel = carousel;
          }, className: outerClasses, onMouseEnter: hoverStart, onMouseLeave: hoverEnd },
        indicators,
        _react2.default.createElement(
          _reactTransitionGroup.TransitionGroup,
          { component: 'div', role: 'listbox', className: innerClasses },
          carouselItems[activeIndex]
        ),
        controlLeft,
        controlRight
      );
    }
  }]);

  return Carousel;
}(_react2.default.Component);

Carousel.propTypes = {
  paused: _propTypes2.default.bool,
  next: _propTypes2.default.func.isRequired,
  previous: _propTypes2.default.func.isRequired,
  keyboard: _propTypes2.default.bool,
  cssModule: _propTypes2.default.object,
  activeIndex: _propTypes2.default.number,
  interval: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.bool]),
  children: _propTypes2.default.array,
  hoverStart: _propTypes2.default.func,
  hoverEnd: _propTypes2.default.func
};

Carousel.defaultProps = {
  interval: 5000,
  hover: false,
  paused: false,
  keyboard: true
};

Carousel.childContextTypes = {
  direction: _propTypes2.default.string
};

exports.default = Carousel;