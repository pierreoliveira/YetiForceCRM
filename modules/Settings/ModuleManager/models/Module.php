<?php
/* +***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 * Contributor(s): YetiForce.com
 * *********************************************************************************** */

class Settings_ModuleManager_Module_Model extends Vtiger_Module_Model
{

	public static function getNonVisibleModulesList()
	{
		return ['ModTracker', 'Portal', 'Users', 'Integration', 'WSAPP',
			'ConfigEditor', 'FieldFormulas', 'VtigerBackup', 'CronTasks', 'Import', 'Tooltip',
			'CustomerPortal', 'Home'];
	}

	/**
	 * Function to get the url of new module import
	 */
	public static function getNewModuleImportUrl()
	{
		return 'index.php?module=ModuleManager&parent=Settings&view=ModuleImport';
	}

	/**
	 * Function to get the url of new module import 
	 */
	public static function getUserModuleImportUrl()
	{
		return 'index.php?module=ModuleManager&parent=Settings&view=ModuleImport&mode=importUserModuleStep1';
	}

	/**
	 * Function to disable a module 
	 * @param type $moduleName - name of the module
	 */
	public function disableModule($moduleName)
	{
		//Handling events after disable module
		\vtlib\Module::toggleModuleAccess($moduleName, false);
	}

	/**
	 * Function to enable the module
	 * @param type $moduleName -- name of the module
	 */
	public function enableModule($moduleName)
	{
		//Handling events after enable module
		\vtlib\Module::toggleModuleAccess($moduleName, true);
	}

	/**
	 * Static Function to get the instance of Vtiger Module Model for all the modules
	 * @return <Array> - List of Vtiger Module Model or sub class instances
	 */
	public static function getAll($presence = [], $restrictedModulesList = [], $isEntityType = false)
	{
		return parent::getAll(array(0, 1), self::getNonVisibleModulesList());
	}

	/**
	 * Function which will get count of modules
	 * @param <Boolean> $onlyActive - if true get count of only active modules else all the modules
	 * @return <integer> number of modules
	 */
	public static function getModulesCount($onlyActive = false)
	{
		$query = (new \App\Db\Query)->from('vtiger_tab');
		if ($onlyActive) {
			$nonVisibleModules = self::getNonVisibleModulesList();
			$query->where(['and', ['presence' => 0], ['NOT IN', 'name', $nonVisibleModules]]);
		}
		return $query->count();
	}

	/**
	 * Function that returns all those modules that support Module Sequence Numbering
	 * @return <Array of Vtiger_Module_Model>
	 */
	public static function getModulesSupportingSequenceNumbering()
	{
		$subQuery = (new \App\Db\Query())->select('tabid')->from('vtiger_field')->where(['uitype' => 4])->distinct('tabid');
		$dataReader = (new \App\Db\Query())->select(['tabid', 'name'])
			->from('vtiger_tab')
			->where(['isentitytype' => 1, 'presence' => 0, 'tabid' => $subQuery])
			->createCommand()->query();
		$moduleModels = [];
		while ($row = $dataReader->read()) {
			$moduleModels[$row['name']] = self::getInstanceFromArray($row);
		}
		return $moduleModels;
	}

	/**
	 * Function to get restricted modules list
	 * @return <Array> List module names
	 */
	public static function getActionsRestrictedModulesList()
	{
		return array('Home', 'Emails');
	}

	public static function createModule($moduleInformation)
	{
		$moduleInformation['entityfieldname'] = strtolower(self::toAlphaNumeric($moduleInformation['entityfieldname']));

		$module = new vtlib\Module();
		$module->name = ucfirst($moduleInformation['module_name']);
		$module->label = $moduleInformation['module_label'];
		$module->type = $moduleInformation['entitytype'];
		$module->save();
		$module->initTables();

		$block = new vtlib\Block();
		$block->label = 'LBL_' . strtoupper($module->name) . '_INFORMATION';
		$module->addBlock($block);

		$blockcf = new vtlib\Block();
		$blockcf->label = 'LBL_CUSTOM_INFORMATION';
		$module->addBlock($blockcf);

		$field1 = new vtlib\Field();
		$field1->name = $moduleInformation['entityfieldname'];
		$field1->label = $moduleInformation['entityfieldlabel'];
		$field1->uitype = 2;
		$field1->column = $field1->name;
		$field1->columntype = 'VARCHAR(255)';
		$field1->typeofdata = 'V~M';
		$block->addField($field1);

		$module->setEntityIdentifier($field1);

		/** Common fields that should be in every module, linked to vtiger CRM core table */
		$field2 = new vtlib\Field();
		$field2->name = 'number';
		$field2->label = 'FL_NUMBER';
		$field2->column = 'number';
		$field2->table = $module->basetable;
		$field2->uitype = 4;
		$field2->typeofdata = 'V~O';
		$field2->columntype = 'varchar(32)';
		$block->addField($field2);

		$field3 = new vtlib\Field();
		$field3->name = 'assigned_user_id';
		$field3->label = 'Assigned To';
		$field3->table = 'vtiger_crmentity';
		$field3->column = 'smownerid';
		$field3->uitype = 53;
		$field3->typeofdata = 'V~M';
		$block->addField($field3);

		$field4 = new vtlib\Field();
		$field4->name = 'createdtime';
		$field4->label = 'Created Time';
		$field4->table = 'vtiger_crmentity';
		$field4->column = 'createdtime';
		$field4->uitype = 70;
		$field4->typeofdata = 'DT~O';
		$field4->displaytype = 2;
		$block->addField($field4);

		$field5 = new vtlib\Field();
		$field5->name = 'modifiedtime';
		$field5->label = 'Modified Time';
		$field5->table = 'vtiger_crmentity';
		$field5->column = 'modifiedtime';
		$field5->uitype = 70;
		$field5->typeofdata = 'DT~O';
		$field5->displaytype = 2;
		$block->addField($field5);

		// Create default custom filter (mandatory)
		$filter1 = new vtlib\Filter();
		$filter1->name = 'All';
		$filter1->isdefault = true;
		$filter1->presence = 0;
		$module->addFilter($filter1);
		// Add fields to the filter created
		$filter1->addField($field1)->addField($field2, 1)->addField($field3, 2)->addField($field4, 2);

		// Set sharing access of this module
		$module->setDefaultSharing();

		// Enable and Disable available tools
		$module->enableTools(['Import', 'Export', 'DuplicatesHandling', 'CreateCustomFilter',
			'DuplicateRecord', 'MassEdit', 'MassDelete', 'MassAddComment', 'MassTransferOwnership',
			'ReadRecord', 'WorkflowTrigger', 'Dashboard', 'CreateDashboardFilter',
			'QuickExportToExcel', 'TagCloud', 'DetailTransferOwnership', 'ExportPdf',
			'RecordMapping', 'RecordMappingList', 'FavoriteRecords', 'WatchingRecords',
			'WatchingModule', 'RemoveRelation', 'ReviewingUpdates']);

		// Initialize Webservice support
		$module->initWebservice();

		// Create files
		$module->createFiles($field1);
		\App\Fields\RecordNumber::setNumber($module->name, 'N', 1);
	}

	public static function toAlphaNumeric($value)
	{
		return preg_replace("/[^a-zA-Z0-9_]/", '', $value);
	}

	public static function getUploadDirectory()
	{
		$uploadDir = 'cache/vtlib';
		return $uploadDir;
	}
}
