package com.spring.devione.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="user")
public class User extends AbstractModel{

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "lastname", nullable = false)
	private String lastname;
	
	@Column(name = "email", nullable = false)
	private String email;
	
	@Column(name = "username", nullable = false, unique=true)
	private String userName;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "active", nullable = false)
	private boolean active = true;
	
	@OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY, mappedBy = "user")
	private Set<Score> scores = new HashSet<Score>();
	
	public User(String name, String lastname, String email, String userName, String password,
			boolean active) {
		super();
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.userName = userName;
		this.password = password;
		this.active = active;
	}
	
	
}
