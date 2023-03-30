package krimselis.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String jwt;
    private UserDto userDto;
}
