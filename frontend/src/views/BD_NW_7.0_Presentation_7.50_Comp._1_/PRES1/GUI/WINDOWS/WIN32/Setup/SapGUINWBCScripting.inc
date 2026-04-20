Sub DeleteAFile(filespec)
	Dim fso, MyFile
	Set fso = CreateObject("Scripting.FileSystemObject")
	Set MyFile = fso.GetFile(filespec)
	MyFile.Delete
End Sub

Function GetGUINWBCConfig(name)
	strValue = ""
	strValue = NwEngine.Shell.GetRegValue("HKLM\SOFTWARE\SAP\SAPGUI Setup Configuration\" & name)
	If strValue = "" Then
		NwEngine.Context.Log.Write "GUINWBC Script: Value of " & name & " is set to: <empty>"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Value of " & name & " is set to: " & strValue
	End If
	GetGUINWBCConfig = strValue
End Function

Sub SetGUINWBCConfig(name, value)
	If NwEngine.Shell.SetRegValue("HKLM\SOFTWARE\SAP\SAPGUI Setup Configuration\" & name, "REG_SZ", CStr(value)) Then
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully set value of " & name & " to: " & value
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Could not set value " & name & "."
	End If
End Sub

Function GetLandscapeKey()
	strRegValue = "HKEY_LOCAL_MACHINE\SOFTWARE\SAP\SAPLogon\LandscapeFormatEnabled"
	NwEngine.Context.Log.Write "GUINWBC Script: Retrieving value " & strRegValue
	If NwEngine.Shell.RegValueExist(strRegValue) Then
		strValue = NwEngine.Shell.GetRegValue(strRegValue)
		If strRegValue = "" Then
			NwEngine.Context.Log.WriteError "GUINWBC Script: Registry value " & strRegValue & " is not set."
			GetLandscapeKey = ""
		Else
			NwEngine.Context.Log.Write "GUIWNBC Script: LandscapeKey " & strRegValue & " is set to " & strValue
			GetLandscapeKey = strValue
		End If
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value " & strRegValue & " doesn't exist."
		GetLandscapeKey = ""
	End If
End Function

Sub SetLandscapeKey(application, value)
	strRegValue = "HKEY_LOCAL_MACHINE\SOFTWARE\SAP\SAPLogon\LandscapeFormatEnabled"
	NwEngine.Context.Log.Write "GUINWBC Script: Set " & strRegValue & " to " & value & "."
	If NwEngine.Shell.SetRegValue(strRegValue, "REG_DWORD", value) Then
		NwEngine.Context.Log.Write "GUIWNBC Script: Successfully set registry value " & strRegValue & " to " & value & "."
		SetGUINWBCConfig "varGUINWBCLandscape", value
		SetGUINWBCConfig "varGUINWBCApplication", application
	Else
		NwEngine.Context.Log.WriteError "GUINWBC Script: Could not set registry value " & strRegValue & " to " & value & "."
	End If
End Sub

Sub RemoveLandscapeKey()
	strRegValue = "HKEY_LOCAL_MACHINE\SOFTWARE\SAP\SAPLogon\LandscapeFormatEnabled"
	NwEngine.Context.Log.Write "GUINWBC Script: Removing regvalue " & strRegValue
	If NwEngine.Shell.RegValueExist(strRegValue) Then
		If NwEngine.Shell.DeleteRegValue(strRegValue) Then
			NwEngine.Context.Log.Write "GUIWNBC Script: Successfully deleted registry value " & strRegValue & "."
		Else
			NwEngine.Context.Log.WriteError "GUINWBC Script: Could not delete registry value " & strRegValue & "."
		End If
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value " & strRegValue & " doesn't exist."
	End If
End Sub

Sub SetSapGuiAsDefaultShortcutHandler()
	NwEngine.Context.Log.Write "GUINWBC Script: Set registry value 'HKCR\.sap\(Default) to 'SAPGui.Shortcut.File'"
	If NwEngine.Shell.SetRegValue("HKCR\.sap\", "REG_SZ", "SAPGUI.Shortcut.File") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully set value of 'HKCR\.sap\(Default)' to 'SAPGui.Shortcut.File'"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Could net set value of 'HKCR\.sap\(Default)'"
	End If
End Sub

Sub SetNWBCAsDefaultShortcutHandler()
	NwEngine.Context.Log.Write "GUINWBC Script: Set registry value 'HKCR\.sap\(Default) to 'nwbc.sap'"
	If NwEngine.Shell.SetRegValue("HKCR\.sap\", "REG_SZ", "nwbc.sap") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully set value of 'HKCR\.sap\(Default)' to 'nwbc.sap'"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Could net set value of 'HKCR\.sap\(Default)'"
	End If
End Sub

Sub CreateNwBcFileHandler(nwbc65installed)
	NwEngine.Context.Log.Write "GUINWBC Script: Checking the presence of 'HKCR\.sap\OpenWithProgIds\nwbc.sap' registry value..."
	If NwEngine.Shell.RegValueExist("HKCR\.sap\OpenWithProgIds\nwbc.sap") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value 'HKCR\.sap\OpenWithProgIds\nwbc.sap' already existing"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Creating registry value 'HKCR\.sap\OpenWithProgIds\nwbc.sap'"
		If NwEngine.Shell.SetRegValue("HKCR\.sap\OpenWithProgIds\nwbc.sap", "REG_SZ", "") Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully created registry value 'HKCR\.sap\OpenWithProgIds\nwbc.sap'"
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Could not create registry value 'HKCR\.sap\OpenWithProgIds\nwbc.sap'"
		End If
	End If
	
	NwEngine.Context.Log.Write "GUINWBC Script: Checking the presence of 'HKCR\.sap\nwbc.sap\(Default)' registry value..."
	If NwEngine.Shell.RegValueExist("HKCR\.sap\nwbc.sap\") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value 'HKCR\.sap\nwbc.sap\' already existing"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Creating registry value 'HKCR\.sap\nwbc.sap\'"
		If NwEngine.Shell.SetRegValue("HKCR\.sap\nwbc.sap\", "REG_SZ", "NWBC Shortcut") Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully created registry value 'HKCR\.sap\nwbc.sap\'"
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Could not create registry value 'HKCR\.sap\nwbc.sap\'"
		End If
	End If
	
	NwEngine.Context.Log.Write "GUINWBC Script: Checking the presence of 'HKCR\.sap\nwbc.sap\ShellNew\NullFile' registry value..."
	If NwEngine.Shell.RegValueExist("HKCR\.sap\nwbc.sap\ShellNew\NullFile") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value 'HKCR\.sap\nwbc.sap\ShellNew\NullFile' already existing"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Creating registry value 'HKCR\.sap\nwbc.sap\ShellNew\NullFile'"
		If NwEngine.Shell.SetRegValue("HKCR\.sap\nwbc.sap\ShellNew\NullFile", "REG_SZ", "") Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully created registry value 'HKCR\.sap\nwbc.sap\ShellNew\NullFile'"
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Could not create registry value 'HKCR\.sap\nwbc.sap\ShellNew\NullFile'"
		End If
	End If
	
	NwEngine.Context.Log.Write "GUINWBC Script: Checking the presence of 'HKCR\nwbc.sap\(Default)' Registry value..."
	If NwEngine.Variables.ResolveString("%User_UI_LangId%=DE") = "DE" Then
		strShortcutName = "SAP GUI Verknüpfung"
	Else
		strShortcutName = "SAP GUI Shortcut"
	End If
	If NwEngine.Shell.GetRegValue("HKCR\nwbc.sap\") = strShortcutName Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value 'HKCR\nwbc.sap\(Default)' is already set to '" & strShortcutName & "'. No change needed."
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value 'HKCR\nwbc.sap\(Default)' is not set or set to a different value. Set '" & strShortcutName & "' now as default value."
		If NwEngine.Shell.SetRegValue("HKCR\nwbc.sap\", "REG_SZ", strShortcutName) Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully set registry value 'HKCR\nwbc.sap\(Default)' to '" & strShortcutName & "'."
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Error inserting value!"
		End If
	End If
		
	If nwbc65installed = "TRUE" Then
		NWBCDestDirVar = "%SapNWBC65DestDir%"
	Else
		NWBCDestDirVar = "%SapNWBC60DestDir%"
	End If
	
	NwEngine.Context.Log.Write "GUINWBC Script: Checking the presence of 'HKCR\nwbc.sap\Shell\Open\command\(Default)' Registry value..."
	If NwEngine.Shell.RegValueExist("HKCR\nwbc.sap\Shell\Open\command\") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry key 'HKCR\nwbc.sap\Shell\Open\command\(Default)' already exist"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Creating registry key 'HKCR\nwbc.sap\Shell\Open\command\(Default)'"
		If NwEngine.Shell.SetRegValue("HKCR\nwbc.sap\Shell\Open\command\", "REG_SZ", Chr(34) & NwEngine.Variables.ResolveString(NWBCDestDirVar & "\NwbcUrlHandler.exe") & Chr(34) & " /SHORTCUT=" & Chr(34) & "%1" & Chr(34)) Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully set registry value"
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Error inserting value!"
		End If
	End If

	NwEngine.Context.Log.Write "GUINWBC Script: Checking the presence of 'HKCR\nwbc.sap\Shell\Edit\command\(Default)' Registry value..."
	If NwEngine.Shell.RegValueExist("HKCR\nwbc.sap\Shell\Edit\command\") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry key 'HKCR\nwbc.sap\Shell\Edit\command\(Default)' already exist"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Creating registry key 'HKCR\nwbc.sap\Shell\Edit\command\(Default)'"
		If NwEngine.Shell.SetRegValue("HKCR\nwbc.sap\Shell\Edit\command\", "REG_SZ", Chr(34) & NwEngine.Variables.ResolveString("%SapFrontEndDir%\sapgui\sapgui.exe") & Chr(34) & " /SHORTCUT=" & Chr(34) & "/edit %1" & Chr(34)) Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully set registry value"
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Error inserting value!"
		End If
	End If
	
	NwEngine.Context.Log.Write "GUINWBC Script: Checking the presence of 'HKCR\nwbc.sap\DefaultIcon\(Default)' Registry value..."
	If NwEngine.Shell.RegValueExist("HKCR\nwbc.sap\DefaultIcon\") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry key 'HKCR\nwbc.sap\DefaultIcon\(Default)' already exist"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Creating registry key 'HKCR\nwbc.sap\DefaultIcon\(Default)'"
		If NwEngine.Shell.SetRegValue("HKCR\nwbc.sap\Defaulticon\", "REG_SZ", NwEngine.Variables.ResolveString("%SapFrontEndDir%\SAPgui\sapshlib.dll") & ",0") Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully set registry value"
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Error inserting value!"
		End If
	End If
End Sub

Sub RemoveNwBcFileHandler()
	Dim regKeys(1)
	regKeys(0) = "HKCR\nwbc.sap"
	regKeys(1) = "HKCR\.sap\nwbc.sap"
	
	For Each regKey in regKeys
		NwEngine.Context.Log.Write "GUINWBC Script: Checking for registry key '" & regKey & "'"
		If NwEngine.Shell.RegKeyExist(regKey) Then
			NwEngine.Context.Log.Write "GUINWBC Script: Registry key '" & regKey & "' exists, will be deleted..."
			If NwEngine.Shell.DeleteRegKey(regKey) Then
				NwEngine.Context.Log.Write "GUINWBC Script: Successfully deleted registry key '" & regKey & "' and all containing keys and values"
			Else
				NwEngine.Context.Log.Write "GUINWBC Script: Error in deleting registry key '" & regKey & "'"
			End If
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Registry key '" & regKey & "' doesn't exist"
		End If
	Next
	
	NwEngine.Context.Log.Write "GUINWBC Script: Removing 'nwbc.sap' entry from 'HKCR\.sap\OpenWithProgIds'"
	If NwEngine.Shell.RegValueExist("HKCR\.sap\OpenWithProgIds\nwbc.sap") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Registry key 'HKCR\.sap\OpenWithProgIds\nwbc.sap' exists, removing..."
		If NwEngine.Shell.DeleteRegValue("HKCR\.sap\OpenWithProgIds\nwbc.sap") Then
			NwEngine.Context.Log.Write "GUINWBC Script: Registry value 'HKCR\.sap\OpenWithProgIds\nwbc.sap' successfully removed."
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: Could not remove registry value 'HKCR\.sap\OpenWithProgIds\nwbc.sap'."
		End If
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value 'HKCR\.sap\OpenWithProgIds\nwbc.sap' doesn't exist."
	End If
End Sub

Sub CreateSapGuiIcons
	Dim SAPGuiShortcut
	Dim SAPGuiPath
	Dim SAPGuiShortcutName
	
	strVarLogon = GetGUINWBCValue("GUILogonInstalled")
	
	If strVarLogon = "TRUE" Then
		SAPGuiPath = NwEngine.Variables.ResolveString("%SapFrontEndDir%\SAPgui\saplogon.exe")
		SAPGuiShortcutName = "SAP Logon"
		NwEngine.Context.Log.Write "GUINWBC Script: Creating shortcut 'SAP Logon' (" & SAPGuiPath & ")"
	Else
		SAPGuiPath = NwEngine.Variables.ResolveString("%SapFrontEndDir%\Sapgui\saplgpad.exe")
		SAPGuiShortcutName = "SAP Logon Pad"
		NwEngine.Context.Log.Write "GUINWBC Script: Creating shortcut 'SAP Logon Pad' (" & SAPGuiPath & ")"
	End If
	
	SAPGuiShortcutDest = CreateObject("WScript.Shell").SpecialFolders("AllUsersDesktop") & "\" + SAPGuiShortcutName + ".lnk"
	NwEngine.Context.Log.Write "GUINWBC Script: Attempting to create shortcut '" & SAPGuiShortcutDest & "' with target '" & SAPGuiPath & "'"
	If NwEngine.Shell.FileExist(SAPGuiShortcutDest) Then
		NwEngine.Context.Log.Write "GUINWBC Script: Shortcut already exist, skipping..."
	Else
		Set SAPGuiShortcut = CreateObject("WScript.Shell").CreateShortcut(SAPGuiShortcutDest)
		SAPGuiShortcut.TargetPath = SAPGuiPath
		SAPGuiShortcut.Save
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully created shortcut."
	End If
End Sub

Sub RemoveSapGuiIcons()
	NwEngine.Context.Log.Write "GUINWBC Script: Checking if SAP Logon/SAP Logon PAD shortcuts are on desktop and removing them"
	PathToDesktop = CreateObject("WScript.Shell").SpecialFolders("AllUsersDesktop")
	If NwEngine.Shell.FileExist(PathToDesktop & "\SAP Logon.lnk") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Found SAP Logon Shortcut on Desktop, removing..."
		DeleteAFile(PathToDesktop & "\SAP Logon.lnk")
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully deleted shortcut '" & PathToDesktop & "\SAP Logon.lnk"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: SAP Logon shortcut is not installed on the desktop"
	End If
	If NwEngine.Shell.FileExist(PathToDesktop & "\SAP Logon PAD.lnk") Then
		NwEngine.Context.Log.Write "GUINWBC Script: Found SAP Logon PAD Shortcut on Desktop, removing..."
		DeleteAFile(PathToDesktop & "\SAP Logon PAD.lnk")
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully deleted shortcut '" & PathToDesktop & "\SAP Logon PAD.lnk"
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: SAP Logon PAD shortcut is not installed on the desktop"
	End If
End Sub

Sub SetGUINWBCValue(name, value)
	If NwEngine.Shell.SetRegValue("HKLM\SOFTWARE\SAP\SAP GUINWBC Integration\" & name, "REG_SZ", value) Then
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully set HKLM\SOFTWARE\SAP\SAP GUINWBC Integration\" & name & " to " & value & "."
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Error setting HKLM\SOFTWARE\SAP\SAP GUINWBC Integration\" & name & " to " & value & "."
	End If
End Sub

Function GetGUINWBCValue(name)
	ConfKey = "HKLM\SOFTWARE\SAP\SAPGUI Setup Configuration\"
	If NwEngine.Shell.RegValueExist(ConfKey & name) Then
		strValue = NwEngine.Shell.GetRegValue(ConfKey & name)
		If strValue <> "" Then
			NwEngine.Context.Log.Write "GUINWBC Script: Successfully retrieved registry value " & ConfKey & name & ": " & strValue
			GetGUINWBCValue = strValue
		Else
			NwEngine.Context.Log.Write "GUINWBC Script: " & ConfKey & name & " is empty, returning FALSE"
			GetGUINWBCValue = "FALSE"
		End If
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: " & ConfKey & name & " doesn't exist, returning FALSE"
		GetGUINWBCValue = "FALSE"
	End If
End Function

Sub SetGUINWBCValueToTrue(name)
	ConfKey = "HKLM\SOFTWARE\SAP\SAPGUI Setup Configuration\"
	If NwEngine.Shell.SetRegValue(ConfKey & name, "REG_SZ", "TRUE") Then
		NwEngine.Context.Log.Write "NWBCGUI Script: Successfully set registry value " & ConfKey & name & " to TRUE."
	Else
		NwEngine.Context.Log.Write "NWBCGUI Script: Error setting registry value " & ConfKey & name & " to TRUE."
	End If
End Sub

Sub SetGUINWBCValueToFalse(name)
	ConfKey = "HKLM\SOFTWARE\SAP\SAPGUI Setup Configuration\"
	If NwEngine.Shell.RegValueExist(ConfKey & name) Then
		NwEngine.Shell.DeleteRegValue(ConfKey & name)
		NwEngine.Context.Log.Write "GUINWBC Script: Successfully removed registry value " & ConfKey & name & "."
	Else
		NwEngine.Context.Log.Write "GUINWBC Script: Registry value " & ConfKey & name & " already removed."
	End If
End Sub

Sub ExecuteGUINWBCIntegration
	strAlreadyProcessed = NwEngine.Variables.GetValue("GUINWBC750AlreadyProcessed")
	varGUINWBCApplication = "varGUINWBCApplication"
	varGUINWBCLandscape = "varGUINWBCLandscape"

	If strAlreadyProcessed = "TRUE" Then
		NwEngine.Context.Log.Write "GUINWBC Script: Script already processed, exiting..."
	Else
		NwEngine.Variables.AppendDefaultValue "GUINWBC750AlreadyProcessed", "TRUE"

		strVarLogon = GetGUINWBCValue("GUILogonInstalled")
		strVarLGPad = GetGUINWBCValue("GUILogonPadInstalled")
		strVarNWBC = GetGUINWBCValue("NWBCInstalled")
		strVarNWBC65 = GetGUINWBCValue("NWBC65Installed")
		strVarNWBCGUI= GetGUINWBCValue("GUINWBCInstalled")
		strStdApp = "NONE"
		strLogonIconOnDesktop = "FALSE"
		strLGPadIconOnDesktop = "FALSE"
		NwEngine.Context.Log.Write "GUINWBC Script: Set Icon behavior and standard .sap file handler..."
		NwEngine.Context.Log.Write "GUINWBC Script: ------------------------------------------------------------"
		NwEngine.Context.Log.Write "GUINWBC Script: Install SAP Logon:     " & strVarLogon
		NwEngine.Context.Log.Write "GUINWBC Script: Install SAP Logon PAD: " & strvarLGPad
		NwEngine.Context.Log.Write "GUINWBC Script: Install SAP NWBC 6.0:  " & strVarNWBC
		NwEngine.Context.Log.Write "GUINWBC Script: Install SAP NWBC 6.5:  " & strVarNWBC65
		NwEngine.Context.Log.Write "GUINWBC Script: Install SAP NWBCGUI:   " & strVarNWBCGUI
		NwEngine.Context.Log.Write "GUINWBC Script: ------------------------------------------------------------"
		If strVarNWBCGUI = "TRUE" Then
			NwEngine.Context.Log.Write "GUINWBC Script: No change, all icons will be installed."
			NwEngine.Context.Log.Write "GUINWBC Script: Standard handler for .sap file shortcuts is now set to SAP GUI"
			strStdApp = "GUINWBC"
			strLogonIconOnDesktop = "TRUE"
			strLGPadIconOnDesktop = "TRUE"
			SetLandscapeKey "GUINWBC", 1
		ElseIf strVarNWBC = "TRUE" Or strVarNWBC65 = "TRUE" Then
			NwEngine.Context.Log.Write "GUINWBC Script: SAP Logon and SAP Logon Pad Icons on desktop will be disabled."
			NwEngine.Context.Log.Write "GUINWBC Script: Standard handler for .sap files is now set to NWBC50"
			If strVarLogon = "TRUE" Or strvarLGPad = "TRUE" Then
				If strVarNWBC65 = "TRUE" Then
					NwEngine.Context.Log.Write "GUINWBC Script: NWBC65 is default app"
					strStdApp = "NWBC65"
				Else
					NwEngine.Context.Log.Write "GUINWBC Script: NWBC60 is default app"
					strStdApp = "NWBC60"
				End If
			Else
				NwEngine.Context.Log.Write "GUINWBC Script: SAP GUI is not installed, no default app for .sap files is needed."
			End If
			strLogonIconOnDesktop = "FALSE"
			strLGPadIconOnDesktop = "FALSE"
			SetLandscapeKey "NWBC", 1
		ElseIf strVarLogon = "TRUE" Or strvarLGPad = "TRUE" Then
			NwEngine.Context.Log.Write "GUINWBC Script: NWBC isn't selected, SAP Logon/SAp Logon Pad Icons will be installed."
			NwEngine.Context.Log.Write "GUINWBC Script: Standard handler for .sap file shortcuts is set to SAP GUI"
			strStdApp = "GUI"
			strLogonIconOnDesktop = "TRUE"
			strLGPadIconOnDesktop = "TRUE"
			strLandscapeFormat = NwEngine.Variables.GetValue("SapGui.LandscapeFormatEnabled")
			strLandscapeFormatInternal = NwEngine.Variables.GetValue("SapGui.LandscapeFormatEnabledInternal")
			strLandscapeFormatBackup = GetGUINWBCConfig(varGUINWBCLandscape)
			strLandscapeFormatApplication = GetGUINWBCConfig(varGUINWBCApplication)
			strLandscapeFormatRegistry = GetLandscapeKey
			NwEngine.Context.Log.Write "GUINWBC Script: ------------------------------------------------------------"
			NwEngine.Context.Log.Write "GUINWBC Script: SapGui.LandscapeFormatEnabled        : " & strLandscapeFormat
			NwEngine.Context.Log.Write "GUINWBC Script: SapGui.LandscapeFormatEnabledInternal: " & strLandscapeFormatInternal
			NwEngine.Context.Log.Write "GUINWBC Script: SapGui.LandscapeFormatBackup         : " & strLandscapeFormatBackup
			NwEngine.Context.Log.Write "GUINWBC Script: SapGui.LandscapeFormatApplication    : " & strLandscapeFormatApplication
			NwEngine.Context.Log.Write "GUINWBC Script: SapGui.LandscapeFormatRegistry       : " & strLandscapeFormatRegistry
			
			varSetLandscapeFormat = vbFalse
			If strLandscapeFormatApplication = "GUINWBC" Then
				NwEngine.Context.Log.Write "GUINWBC Script: GUINWBC integration was installed before and is uninstalled now, LandscapeKey will be set."
				varSetLandscapeFormat = vbTrue
			ElseIf strLandscapeFormatApplication = "NWBC" Then
				NwEngine.Context.Log.Write "GUINWBC Script: NWBC was installed before and is uninstalled now, LandscapeKey will be set."
				varSetLandscapeFormat = vbTrue
			ElseIf strLandscapeFormatApplication = "GUI" And strLandscapeFormatBackup <> "" Then
				NwEngine.Context.Log.Write "GUINWBC Script: GUI standalone is installed and backup key is set. Evaluating if a LandscapeKey needs to be set."
				If strLandscapeFormatRegistry = strLandscapeFormatBackup Then
					NwEngine.Context.Log.Write "GUINWBC Script: No manual change detected, LandscapeKey can will be set."
					varSetLandscapeFormat = vbTrue
				Else
					NwEngine.Context.Log.Write "GUINWBC Script: Manual change detected, LandscapeKey won't be set to preserve user change."
					SetGUINWBCConfig "varGUINWBCLandscape", strLandscapeFormatInternal
					SetGUINWBCConfig "varGUINWBCApplication", "GUI"
				End If
			Else
				If strLandscapeFormatRegistry <> "" Then
					NwEngine.Context.Log.Write "GUINWBC Script: This is an update from an older version of SAP GUI 750, try to check if LandscapeKey was changed by user."
					If strLandscapeFormatInternal = strLandscapeFormatRegistry Then
						NwEngine.Context.Log.Write "GUINWBC Script: Default value and registry value have the same value, this seems to be no manual change. LandscapeKey will be set."
						varSetLandscapeFormat = vbTrue
					Else
						NwEngine.Context.Log.Write "GUINWBC Script: Default value and registry value are different, this could be a manual change of the registry value or a change of default."
						SetGUINWBCConfig "varGUINWBCLandscape", strLandscapeFormatInternal
						SetGUINWBCConfig "varGUINWBCApplication", "GUI"
					End If
				Else
					NwEngine.Context.Log.Write "GUINWBC Script: This seems to be a fresh install, LandscapeKey needs to be set."
					varSetLandscapeFormat = vbTrue
				End If
			End If
			NwEngine.Context.Log.Write "GUINWBC Script: ------------------------------------------------------------"
			
			If strLandscapeFormat <> "" Then
				NwEngine.Context.Log.Write "GUINWBC Script: LandscapeFormat variable is set, this seems to be a package, using this value."
				strLandscapeFormatInternal = strLandscapeFormat
				varSetLandscapeFormat = vbTrue
			Else
				NwEngine.Context.Log.Write "GUINWBC Script: LandscapeVariable is not set, this is no package or package doesn't change this variable."
				varSetLandscapeFormat = vbFalse
			End If
			
			If varSetLandscapeFormat Then
				SetLandscapeKey "GUI", strLandscapeFormatInternal
			End If
		Else
			NwEngine.Context.Log.Write "GUINWBC Scipt: Uninstalling NWBC and GUI, everything needs to be removed."
			strLogonIconOnDesktop = "FALSE"
			strLGPadIconOnDesktop = "FALSE"
			strStdApp = "NONE"
			RemoveLandscapeKey
		End If
		NwEngine.Context.Log.Write "GUINWBC Script: ------------------------------------------------------------"
		
		RemoveSapGuiIcons
		If ((strLogonIconOnDesktop = "TRUE") And (strVarLogon = "TRUE")) Or ((strLGPadIconOnDesktop = "TRUE") And (strVarLGPad = "TRUE")) Then
			CreateSapGuiIcons
		End If
		
		If strStdApp <> "NONE" Then
			If strStdApp = "NWBC60" Or stdStdApp = "NWBC65" Then
				SetNWBCAsDefaultShortcutHandler
			Else
				SetSapGuiAsDefaultShortcutHandler
			End If
		End If
			
		If (strVarNWBC65 = "TRUE" And strStdApp = "NWBC65") Or (strVarNWBC = "TRUE" And strStdApp = "NWBC60") Or strStdApp = "GUINWBC" Then
			CreateNwBcFileHandler strVarNWBC65
		Else
			RemoveNwBcFileHandler
		End If
	End If
End Sub