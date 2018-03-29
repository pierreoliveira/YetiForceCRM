{*<!-- {[The file is published on the basis of YetiForce Public License 3.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} -->*}
{strip}
	{assign var=VALUE value=$FIELD->getValue($ITEM_VALUE)}
	<div class="input-group input-group-sm">
		<input name="{$FIELD->getColumnName()}{$ROW_NO}" value="{$FIELD->getEditValue($VALUE)}" title="{$FIELD->getEditValue($VALUE)}" type="text" 
			   data-validation-engine="validate[required,funcCall[Vtiger_NumberUserFormat_Validator_Js.invokeValidation]]" 
			   class="unitPrice smallInputBox form-control form-control-sm" list-info="" {if $FIELD->get('displaytype') == 10}readonly="readonly"{/if}/>

		{assign var=PRICEBOOK_MODULE_MODEL value=Vtiger_Module_Model::getInstance('PriceBooks')}
		{if $PRICEBOOK_MODULE_MODEL->isPermitted('DetailView')}
			<div class="input-group-append">
				<span class="input-group-text priceBookPopup u-cursor-pointer popoverTooltip" data-content="{\App\Language::translate('PriceBooks',$MODULE)}">
					<span class="userIcon-PriceBooks"  data-popup="Popup" data-module-name="PriceBooks" alt="{\App\Language::translate('PriceBooks',$MODULE)}"/></span>
				</span>
			</div>
		{/if}

	</div>
{/strip}
