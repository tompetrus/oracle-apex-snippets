/*If you ever wondered, there's an easy way to see data from APEX collections in your favorite PL/SQL IDE (PL/SQL Developer, TOAD, SQL Developer...).

You only have to run short anonymous PL/SQL block and define:


workspace name (workspace ID)
application ID
session ID.


Here's the script:

*/
declare
  v_workspace_id apex_workspaces.workspace_id%type;
begin
  select workspace_id
    into v_workspace_id
    from apex_workspaces
   where workspace = '&WORKSPACE_NAME';
   
   -- Set Workspace ID
   apex_util.set_security_group_id(v_workspace_id);


   -- Set Application ID
   apex_application.g_flow_id  := &APP_ID;     
   
   -- Set Session ID
   apex_application.g_instance := &APP_SESSION;  
end;


/*
After you run this script you can easily do query from apex_collections view and you'll see the result
*/