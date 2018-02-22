import React from 'react';
import ReactDOM from 'react-dom';
import ProfileCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};

ProtoGraph.Card.toProfile = function () {
  this.cardType = 'toProfileCard';
}

ProtoGraph.Card.toProfile.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toProfile.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toProfile.prototype.renderCol7= function (data) {
  this.mode = 'col7';
  this.render();
}

ProtoGraph.Card.toProfile.prototype.renderCol4= function (data) {
  this.mode = 'col4';
  this.render();
}

ProtoGraph.Card.toProfile.prototype.renderCol3= function (data) {
  this.mode = 'col3';
  this.render();
}

ProtoGraph.Card.toProfile.prototype.renderCol2= function (data) {
  this.mode = 'col2';
  this.render();
}

ProtoGraph.Card.toProfile.prototype.render = function () {
  ReactDOM.render(
    <ProfileCard
      dataURL={this.options.data_url}
      selector={this.options.selector}
      siteConfigURL={this.options.site_config_url}
      siteConfigs={this.options.site_configs}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }} />,
    this.options.selector);
}