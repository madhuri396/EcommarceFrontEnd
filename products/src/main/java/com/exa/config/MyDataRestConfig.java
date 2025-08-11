package com.exa.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,CorsRegistry cors) {
//		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
		exposeIds(config);
	}
	
	
	private void exposeIds(RepositoryRestConfiguration config) {
		
		//get all Entity classes from entity manager
		Set<EntityType<?>> entities= entityManager.getMetamodel().getEntities();
		
		//create an array for the entity types
		List<Class> entityClasses = new ArrayList<>();
		
		//get entity types for entities
		for(EntityType tempEntityType: entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		
		//expose ids for domain types
		Class[] doaminTypes=entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(doaminTypes);
		
	}
	
}
