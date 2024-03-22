package com.spring.devione.security.services;

import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.devione.entity.User;


public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String lastname;
	private String email;
	private String userName;
	@JsonIgnore
	private String password;
	private boolean isActive;

	private Collection<? extends GrantedAuthority> authorities;


	public UserDetailsImpl(Long id, String name, String lastname, String email, String userName, String password,
			boolean isActive) {
		this.id = id;
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.userName = userName;
		this.password = password;
		this.isActive = isActive;
	}

	public static UserDetailsImpl build(User user) {
		;

		return new UserDetailsImpl(user.getId(), user.getName(), user.getLastname(), user.getEmail(),
				user.getUserName(), user.getPassword(), user.isActive());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getLastname() {
		return lastname;
	}

	public String getEmail() {
		return email;
	}

	public boolean isActive() {
		return isActive;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}
