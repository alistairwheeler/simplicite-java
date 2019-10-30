ANSMSre.postLoad = function() {
    var g = this.getGrant();
    var rights = g.changeAccess("User", true, true, true, true);
    var userObject = g.getTmpObject("User");
    var userDirection;
    userObject.resetFilters();
    userObject.resetValues();

    userObject.getField("usr_login").setFilter(g.getLogin());
    var users = userObject.search();

    if (users != null) {
        var userRow = users.get(0);
        userObject.setValues(userRow,true);
        userRowId = userObject.getRowId();
        userDirection = userObject.getFieldValue("ansmDirectionCode");
    }
  	if (this.isHomeInstance() && this.getGrant().hasResponsibility("ANSM_APP_USER")) {
          this.setSearchSpec("t.sre_declarantid =" + "'" + userRowId + "'");
      }
    if(this.getGrant().hasResponsibility("ANSM_APP_USER") && !this.isHomeInstance()){
    	this.setSearchSpec("t.sre_direction =" + "'" + userDirection + "'" + " OR exists (SELECT 1 FROM ansm_sredir sredir, ansm_direction dir WHERE dir.row_id = sredir.ansm_sredirdir_id AND sredir.ansm_sredirsre_id = t.row_id AND dir.direction_code = "+ "'"+userDirection+ "')");
    }

    g.changeAccess("User", rights);

};
