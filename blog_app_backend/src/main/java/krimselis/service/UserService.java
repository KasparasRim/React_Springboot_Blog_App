package krimselis.service;

import krimselis.dto.RegistrationDto;
import krimselis.entity.User;

public interface UserService {
    void saveUser(RegistrationDto registrationDto);

        User findByEmail(String email);
}
