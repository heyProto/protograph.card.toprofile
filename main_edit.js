import React from 'react';
import ReactDOM from 'react-dom';
import EditProfileCard from './src/js/EditContainer.jsx';

ProtoGraph.Card.toProfile.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toProfile.prototype.renderSEO = function (data) {
  this.renderMode = 'SEO';
  return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toProfile.prototype.renderEdit = function (onPublishCallback) {
  this.mode = 'edit';
  this.onPublishCallback = onPublishCallback;
  ReactDOM.render(
    <EditProfileCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      uiSchemaURL={this.options.ui_schema_url}
      domain={this.options.domain}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      siteConfigURL={this.options.site_config_url}
      onPublishCallback={this.onPublishCallback}
      houseColors={this.options.houseColors}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}