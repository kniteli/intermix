let connect = (mapStateToSchema: any) => {
    return (component: any) => {
        return function() {
            component.state = component.mapStateToSchema(component.store.getState());
            component.update();
        }
    } 
}

export default connect; 